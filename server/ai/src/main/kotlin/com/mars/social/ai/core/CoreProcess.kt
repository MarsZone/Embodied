package com.mars.social.ai.core

import org.springframework.stereotype.Service
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController

@Service
@RestController
class CoreProcess {
    @RequestMapping("/test") //测试
    fun command(): String {
        println("hello world")
        return "hello world"
    }
}