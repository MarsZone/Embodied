package com.mars.social.controller

import cn.dev33.satoken.annotation.SaCheckLogin
import cn.dev33.satoken.annotation.SaCheckRole
import cn.dev33.satoken.stp.StpUtil
import com.mars.social.model.User
import com.mars.social.model.UserDetail
import com.mars.social.model.UserDetails
import com.mars.social.model.Users
import com.mars.social.utils.MessageUtil
import com.mars.social.utils.R
import org.ktorm.database.Database
import org.ktorm.dsl.eq
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

    @PostMapping("/register")
    fun registerUser(@RequestBody user: User): ResponseEntity<R> {
        //Todo user name 需要校验
        //Todo password 加密
        user.isActive = "true"
        user.registerTime = LocalDateTime.now()
        user.lastLoginTime = LocalDateTime.now()
        val users = database.sequenceOf(Users)
        users.add(user)
        var data = messageUtil.get("account.register.succeed")
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
            if(user.password == dto.password){
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
        var data = messageUtil.get("sign.out");
        return ResponseEntity.ok().body(R.ok(data))
    }

    @RequestMapping("/isLogin")
    fun isLogin(): ResponseEntity<R> {
        var data = messageUtil.get("login.state") + StpUtil.isLogin()
        return ResponseEntity.ok().body(R.ok(data))
    }

    //用户信息详情部分
    @GetMapping("/userDetail")
    fun detailList(@RequestParam uid:Long): ResponseEntity<R> {
        val userDetails = database.sequenceOf(UserDetails)
        val detail = userDetails.find { it.uid eq uid }
        return if(detail != null){
            ResponseEntity.ok().body(R.ok(detail))
        }else{
            ResponseEntity.ok().body(R.fail("查询失败"))
        }

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
        return ResponseEntity.ok(R.ok("用户信息已更新"))
    }
}