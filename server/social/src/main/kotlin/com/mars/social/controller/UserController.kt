package com.mars.social.controller

import com.mars.social.model.User
import com.mars.social.model.Users
import org.ktorm.database.Database
import org.ktorm.entity.sequenceOf
import org.ktorm.entity.toList
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController

@RestController
@RequestMapping("/api/users")
class UserController {

    @Autowired
    protected lateinit var database: Database
    @PostMapping("/register")
    fun registerUser(@RequestBody user: User): ResponseEntity<String> {
        // 在这里实现用户注册逻辑，验证用户信息，存储用户信息等操作
        // 返回成功注册提示信息或错误信息
        return ResponseEntity.ok("用户注册成功")
    }

    /**
     * 查询所有用户列表信息，暂时测试用，后面要考虑假如给后台使用，怎么做权限管控。
     */
    @GetMapping("/list")
    fun getAllUsers(): ResponseEntity<List<User>> {
        val users = database.sequenceOf(Users).toList()
        return ResponseEntity.ok(users)
    }
}