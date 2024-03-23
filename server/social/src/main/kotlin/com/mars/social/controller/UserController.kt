package com.mars.social.controller

import cn.dev33.satoken.stp.StpUtil
import com.mars.social.model.User
import com.mars.social.model.UserDetail
import com.mars.social.model.UserDetails
import com.mars.social.model.Users
import com.mars.social.utils.MessageUtil
import org.ktorm.database.Database
import org.ktorm.dsl.eq
import org.ktorm.entity.add
import org.ktorm.entity.find
import org.ktorm.entity.sequenceOf
import org.ktorm.entity.toList
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.context.MessageSource
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*
import java.time.LocalDateTime


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
    fun registerUser(@RequestBody user: User): ResponseEntity<String> {

        user.isActive = "true"
        user.registerTime = LocalDateTime.now()
        user.lastLoginTime = LocalDateTime.now()
        val users = database.sequenceOf(Users)
        users.add(user)
        return ResponseEntity.ok(messageUtil.get("account.register.succeed"))
    }

    /**
     * 查询所有用户列表信息，暂时测试用，后面要考虑假如给后台使用，怎么做权限管控。
     */
    @GetMapping("/list")
    fun getAllUsers(): ResponseEntity<List<User>> {
        val users = database.sequenceOf(Users).toList()
        return ResponseEntity.ok().body(users)
    }

    @PostMapping("/login")
    fun login(@RequestBody dto: User):ResponseEntity<String>{
        val users = database.sequenceOf(Users)
        val user = users.find { it.userName eq dto.userName  }
        if (user != null) {
            if(user.password == dto.password){
                StpUtil.login(10001)
                return ResponseEntity.ok(messageUtil.get("sign.in.succeed"))
            }
        }
        return ResponseEntity.ok(messageUtil.get("sign.in.failed"))
    }

    @RequestMapping("/logout")
    fun logout(): ResponseEntity<String> {
        StpUtil.logout()
        return ResponseEntity.ok(messageUtil.get("sign.out"))
    }

    @RequestMapping("/isLogin")
    fun isLogin(): String? {
        return messageUtil.get("login.state") + StpUtil.isLogin()
    }

    //用户信息详情部分
    @GetMapping("/userDetail")
    fun detailList(@RequestParam uid:Long): ResponseEntity<UserDetail> {
        val userDetails = database.sequenceOf(UserDetails)
        val detail = userDetails.find { it.uid eq uid }
        return ResponseEntity.ok().body(detail)
    }

    @PostMapping("/setUserDetail")
    fun registerUser(@RequestBody userDetail : UserDetail): ResponseEntity<String> {
        val userDetails = database.sequenceOf(UserDetails)
        val detail = userDetails.find { it.uid eq userDetail.uid }

        return ResponseEntity.ok("用户信息已更新")
    }
}