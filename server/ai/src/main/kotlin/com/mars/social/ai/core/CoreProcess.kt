package com.mars.social.ai.core

import com.google.gson.Gson
import com.mars.social.ai.api.ApiCall
import com.mars.social.ai.chats.UserModel
import com.mars.social.ai.vo.ChatStruct
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
        val  json= apiCall.call(UserModel.toGenAccount());
        println(json)
        if (json != null) {
            json.trimIndent()
            val chatStruct = Gson().fromJson(json, ChatStruct::class.java)
            println(chatStruct)
        }
    }
}