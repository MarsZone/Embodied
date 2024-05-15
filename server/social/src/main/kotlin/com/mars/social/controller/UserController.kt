package com.mars.social.controller

import cn.dev33.satoken.annotation.SaCheckLogin
import cn.dev33.satoken.annotation.SaCheckRole
import cn.dev33.satoken.secure.SaSecureUtil
import cn.dev33.satoken.stp.StpUtil
import com.mars.social.dto.UserInfoDto
import com.mars.social.model.user.*
import com.mars.social.utils.MessageUtil
import com.mars.social.utils.R
import org.ktorm.database.Database
import org.ktorm.dsl.*
import org.ktorm.entity.*
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.context.MessageSource
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*
import java.time.LocalDateTime


@CrossOrigin
@RestController
@RequestMapping("/api/users")
class UserController {

    @Autowired
    protected lateinit var database: Database

    @Autowired
    private lateinit var messageUtil: MessageUtil

    @Autowired
    private val messageSource: MessageSource? = null

    @Autowired
    private lateinit var messageController:MessageController

    @PostMapping("/register")
    fun registerUser(@RequestBody user: User): ResponseEntity<R> {
        //Todo user name 需要校验,check if user is created
        var users  = database.sequenceOf(Users)

        val check  = users.find { it.userName eq user.userName }
        if(check!=null){
            return ResponseEntity.ok().body(R.fail("user already register"))
        }
        //Todo password 加密
        user.password = SaSecureUtil.md5(user.password);
        user.isActive = "true"
        user.registerTime = LocalDateTime.now()
        user.lastLoginTime = LocalDateTime.now()
        users.add(user)
        val data = messageUtil.get("account.register.succeed")
        return ResponseEntity.ok().body(R.ok(data))
    }

    /**
     * 查询所有用户列表信息，暂时测试用，后面要考虑假如给后台使用，怎么做权限管控。
     */
    @SaCheckLogin
    @SaCheckRole("sys")
    @GetMapping("/list")
    fun getAllUsers(): ResponseEntity<R> {
        val users = database.sequenceOf(Users).toList()
        return ResponseEntity.ok().body(R.ok(users))
    }

    @PostMapping("/login")
    fun login(@RequestBody dto: User):ResponseEntity<R>{
        val users = database.sequenceOf(Users)
        val user = users.find { it.userName eq dto.userName  }
        var data = ""
        if (user != null) {
            val encryptPass = SaSecureUtil.md5(dto.password);
            if(user.password == encryptPass){
                StpUtil.login(user.id)
//                data = messageUtil.get("sign.in.succeed")
                val tokenInfo = StpUtil.getTokenInfo()
                return ResponseEntity.ok().body(R.ok(tokenInfo))
            }
        }
        data = messageUtil.get("sign.in.failed")
        return ResponseEntity.ok().body(R.fail(data))
    }

    @RequestMapping("/logout")
    fun logout(): ResponseEntity<R> {
        StpUtil.logout()
        val data = messageUtil.get("sign.out");
        return ResponseEntity.ok().body(R.ok(data))
    }

    @RequestMapping("/isLogin")
    fun isLogin(): ResponseEntity<R> {
        val data = messageUtil.get("login.state") + StpUtil.isLogin()
        return ResponseEntity.ok().body(R.ok(data))
    }

//    @RequestMapping("resetPassword")
//    fun resetPassword(): ResponseEntity<R>{
//        val usersList = database.sequenceOf(Users).toList()
//        val users = database.sequenceOf(Users)
//        for(user in usersList){
//            user.password = SaSecureUtil.md5("123456");
//            users.update(user)
//        }
//        return ResponseEntity.ok().body(R.ok("done"))
//    }

    //用户信息详情部分
    @GetMapping("/userDetail")
    fun detailList(@RequestParam uid:Long): ResponseEntity<R> {
        val userDetails = database.sequenceOf(UserDetails)
        val detail = userDetails.find { it.uid eq uid }
        val user = database.from(Users).select().where{ Users.id eq uid }.map { row -> Users.createEntity(row) }.firstOrNull()
        val uInfo = user?.let { UserInfoDto(it.userName,user.email,user.phone,detail) }
        return if(uInfo != null){
            ResponseEntity.ok().body(R.ok(uInfo))
        }else{
            ResponseEntity.ok().body(R.fail("query failed"))
        }
    }

    data class UserInfo(val uid:Long,val nickName:String)
    @GetMapping("/userSimpleInfo")
    fun userSimpleInfo(@RequestParam uid:Long): ResponseEntity<R> {
        val userDetails = database.sequenceOf(UserDetails)
        val detail = userDetails.find { it.uid eq uid }
        if(detail!=null){
            val userInfo = UserInfo(detail.uid,detail.nickName);
            return ResponseEntity.ok().body(R.ok(userInfo))
        }
        return ResponseEntity.ok().body(R.fail("not found"))
    }

    @PostMapping("/setUserDetail")
    fun registerUser(@RequestBody userDetail : UserDetail): ResponseEntity<R> {
        val userDetails = database.sequenceOf(UserDetails)
        val detail = userDetails.find { it.uid eq userDetail.uid }
        if(detail==null){
            //add
            userDetails.add(userDetail)
        }else{
            //update
            userDetail.id = detail.id
            userDetails.update(userDetail)
        }
        return ResponseEntity.ok(R.ok("user info updated"))
    }

    @SaCheckLogin
    @GetMapping("/applyToFriend")
    fun applyToFriend(@RequestParam targetUser:Long): ResponseEntity<R> {
        val suid = StpUtil.getLoginId().toString().toLong()
        val applyRequest = Entity.create<Friendship>()
        applyRequest.uidSource=suid
        applyRequest.uidTo=targetUser
        applyRequest.createTime= LocalDateTime.now()
        applyRequest.updateTime= LocalDateTime.now()
        applyRequest.status="applying"

        val friendships = database.sequenceOf(Friendships)
        val check = friendships.filter { it.uidSource eq suid }.filter { it.uidTo eq targetUser }.firstOrNull()
        if(check!=null){
            return ResponseEntity.ok(R.fail("request existed"))
        }else{
            applyRequest.msgId = messageController.sendSysMsg(suid,targetUser,"you have a new friends request")
            friendships.add(applyRequest)
        }
        return ResponseEntity.ok(R.ok("request applied"))
    }

    @SaCheckLogin
    @GetMapping("/cancelApplyToFriends")
    fun cancelApplyToFriends(@RequestParam targetUser:Long):ResponseEntity<R>{
        val suid = StpUtil.getLoginId().toString().toLong()
        val friendships = database.sequenceOf(Friendships)
        //val check = friendships.filter { it.uidSource eq suid }.filter { it.uidTo eq targetUser }.firstOrNull()
        val check = friendships.find{ (it.uidSource eq suid) and (it.uidTo eq targetUser) and (it.status eq "applying") }
        if(check!=null){
            messageController.retractMsg(check.msgId)
            check.delete();
            return ResponseEntity.ok(R.ok("request canceled"))
        }else{
            return ResponseEntity.ok(R.fail("request existed"))
        }
    }


    //query user friends
    @SaCheckLogin
    @GetMapping("getMyFriends")
    fun getMyFriends():ResponseEntity<R>{
        val suid = StpUtil.getLoginId().toString().toLong()
        val friendships = database.sequenceOf(Friendships).filter{ it.status eq "friends" }.filter { (it.uidSource eq suid) or (it.uidTo eq suid) }.toList().reversed()
        return ResponseEntity.ok(R.ok(friendships))
    }
    @SaCheckLogin
    @GetMapping("checkIsFriendByUid")
    fun checkIsFriend(@RequestParam targetUser:Long):ResponseEntity<R>{
        val suid = StpUtil.getLoginId().toString().toLong()
        val check = database.sequenceOf(Friendships).filter{ it.status eq "friends" }
            .filter { ((it.uidSource eq suid) and (it.uidTo eq targetUser)) or ((it.uidSource eq targetUser) and (it.uidTo eq suid)) }.firstOrNull()
        if(check!=null){
            return ResponseEntity.ok(R.ok("true"))
        }else{
            return ResponseEntity.ok(R.ok("false"))
        }
    }

    //get apply list reverse
    @SaCheckLogin
    @GetMapping("/getMyApplyList")
    fun getMyApplyList():ResponseEntity<R>{
        val suid = StpUtil.getLoginId().toString().toLong()
        val friendships = database.sequenceOf(Friendships).filter { it.uidTo eq suid }.filter { it.status eq "applying" }.toList().reversed()
        return ResponseEntity.ok().body(R.ok(friendships))
    }

    //Todo 被申请的列表

    @SaCheckLogin
    @GetMapping("/approveApply")
    fun approveApply(@RequestParam applyId:Long):ResponseEntity<R>{
        val friendships = database.sequenceOf(Friendships)
        val check = friendships.filter { it.id eq applyId }.firstOrNull()
        if(check!=null){
            check.status = "friends"
            check.updateTime = LocalDateTime.now()
            friendships.update(check)
            return ResponseEntity.ok(R.ok("apply accepted"))
        }
        return ResponseEntity.ok(R.fail("no apply record"))
    }

    @SaCheckLogin
    @GetMapping("follow")
    fun follow(@RequestParam targetUid:Long):ResponseEntity<R> {
        val uid = StpUtil.getLoginId()
        val followUid = uid.toString().toLong()
        val userFollowDB = database.sequenceOf(UserFollowDB)
        var check = userFollowDB.filter{ UserFollowDB.followedUid eq targetUid}.filter{ UserFollowDB.followerUid eq followUid}.firstOrNull()
        if(check==null){
            val userFollow = Entity.create<UserFollow>()
            userFollow.followerUid=followUid
            userFollow.followedUid=targetUid
            userFollow.createTime = LocalDateTime.now()
            userFollowDB.add(userFollow)
            return ResponseEntity.ok().body(R.ok("Done"))
        }
        return ResponseEntity.ok().body(R.fail("already followed"))
    }

    @SaCheckLogin
    @GetMapping("unFollow")
    fun unFollow(@RequestParam targetUid:Long):ResponseEntity<R> {
        val uid = StpUtil.getLoginId()
        val followUid = uid.toString().toLong()
        val check = database.sequenceOf(UserFollowDB).filter{ UserFollowDB.followedUid eq targetUid}.filter{ UserFollowDB.followerUid eq followUid}.firstOrNull()
        if(check!=null){
            check.delete()
        }
        return ResponseEntity.ok().body(R.ok("Done"))
    }

    @SaCheckLogin
    @GetMapping("checkFollow")
    fun checkFollow(@RequestParam targetUid:Long):ResponseEntity<R> {
        val uid = StpUtil.getLoginId()
        val followUid = uid.toString().toLong()
        val check = database.sequenceOf(UserFollowDB).filter{ UserFollowDB.followedUid eq targetUid}.filter{ UserFollowDB.followerUid eq followUid}.firstOrNull()
        if(check!=null){
            return ResponseEntity.ok().body(R.ok("true"))
        }
        return ResponseEntity.ok().body(R.ok("false"))
    }

}