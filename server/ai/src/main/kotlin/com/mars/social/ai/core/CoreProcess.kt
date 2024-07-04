package com.mars.social.ai.core

import com.mars.social.ai.api.ApiCall
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.stereotype.Service
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController

@Service
@RestController
class CoreProcess {
    @Autowired
    lateinit var apiCall: ApiCall
    @RequestMapping("/test") //测试
    fun command(): String {
        println("hello world")
        return "hello world"
    }

    @GetMapping("/initAi")
    fun initAi(){

    }
}