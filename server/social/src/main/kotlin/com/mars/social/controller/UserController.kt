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
        printCurToken()
        val data = StpUtil.isLogin()
        return ResponseEntity.ok().body(R.ok(data))
    }
    fun printCurToken(){
        // 获取当前会话的 token 值
        val curToken = StpUtil.getTokenValue();
        // 获取当前`StpLogic`的 token 名称
        val curTokenName = StpUtil.getTokenName();
        // 获取指定 token 对应的账号id，如果未登录，则返回 null
        val id = StpUtil.getLoginIdByToken(curToken);
        // 获取当前会话剩余有效期（单位：s，返回-1代表永久有效）
        val last = StpUtil.getTokenTimeout();
        // 获取当前会话的 token 信息参数
        var tokenInfo = StpUtil.getTokenInfo();
        print(curToken)
        print(curTokenName)
        print(id)
        print(last)
        print(tokenInfo)
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
            applyRequest.msgId = messageController.sendSysMsg(targetUser,"you have a new friends request")
            friendships.add(applyRequest)
        }
        return ResponseEntity.ok(R.ok("request applied"))
    }

    @SaCheckLogin
    @GetMapping("/rejectApplyWithReason")
    fun rejectApplyWithReason(@RequestParam applyId: Long,@RequestParam rejectReason:String):ResponseEntity<R>{
        var requestRow = database.from(Friendships).select().where{ (Friendships.id eq applyId) and (Friendships.status eq "applying") }.map { row -> Friendships.createEntity(row) }.firstOrNull()
        if(requestRow != null){
            requestRow.status = "rejected"
            requestRow.rejectReason  = rejectReason
            requestRow.msgId = messageController.sendSysMsg(requestRow.uidSource,
                "your apply was rejected because:$rejectReason"
            )
            var friendships = database.sequenceOf(Friendships)
            friendships.update(requestRow)
        }
        return ResponseEntity.ok(R.ok("request rejected"))
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

    data class FriendsResponse(val friendShips:Friendship, val sourceUserDetail: UserDetail?, val toUserDetail: UserDetail?);
    //query user friends
    @SaCheckLogin
    @GetMapping("getMyFriends")
    fun getMyFriends():ResponseEntity<R>{
        val suid = StpUtil.getLoginId().toString().toLong()
        val friendships = database.sequenceOf(Friendships).filter{ it.status eq "friends" }.filter { (it.uidSource eq suid) or (it.uidTo eq suid) }.toList().reversed()
        val resList:MutableList<FriendsResponse> = ArrayList()
        for(item in friendships){
            val sourceUserDetail = database.sequenceOf(UserDetails).filter { it.uid eq item.uidSource }.firstOrNull()
            val toUserDetail = database.sequenceOf(UserDetails).filter { it.uid eq item.uidTo }.firstOrNull()
            val res = FriendsResponse(item,sourceUserDetail,toUserDetail);
            resList.add(res)
        }
        return ResponseEntity.ok(R.ok(resList))
    }

    @GetMapping("searchUserByNickName")
    fun searchUserByNickName(@RequestParam nickName:String):ResponseEntity<R>{
        val queryStr = "%$nickName%"
        val users = database.sequenceOf(UserDetails).filter { it.nickName like queryStr }.toList()
        return ResponseEntity.ok(R.ok(users))
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

    @SaCheckLogin
    @GetMapping("getMyFollowList")
    fun getMyFollowList():ResponseEntity<R>{
        val uid = StpUtil.getLoginId()
        val followUid = uid.toString().toLong()
        var followList = database.sequenceOf(UserFollowDB).filter { UserFollowDB.followerUid eq followUid }.toList().reversed()
        for(item in followList){
            val info = getUserInfo(item.followedUid)
            item.followUserUserName = info?.userName
            item.followUserNickName = info?.nickName
        }
        return ResponseEntity.ok().body(R.ok(followList))
    }

    @GetMapping("checkAllToken")
    fun checkAllToken(){
        // 获取所有已登录的会话id
        val tokens = StpUtil.searchTokenValue("", 0, -1, false)
        val sessions = StpUtil.searchSessionId("", 0, -1, false)
        val searchTokenSessionId = StpUtil.searchTokenSessionId("", 0, -1, false)
        println(tokens.toString())
        println(sessions.toString())
        println(searchTokenSessionId.toString())
    }

    //-------------utils----------
    data class UserInfoDto(val uid:Long,val nickName: String?,val userName:String?)
    fun getUserInfo(uid:Long): UserInfoDto? {
        val info = database.from(Users).leftJoin(UserDetails,on=Users.id eq UserDetails.uid)
            .select(Users.id,Users.userName,UserDetails.nickName).where { Users.id eq uid }
            .map { row ->
                UserInfoDto(
                    uid = uid,
                    nickName = row[Users.userName],
                    userName = row[UserDetails.nickName]
                )
            }.firstOrNull()
        return info
    }
}