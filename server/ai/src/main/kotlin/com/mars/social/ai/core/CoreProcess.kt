package com.mars.social.ai.core

import com.google.gson.Gson
import com.mars.social.ai.api.ApiCall
import com.mars.social.ai.chats.UserModel
import com.mars.social.ai.vo.ChatStruct
import okhttp3.MediaType
import okhttp3.MediaType.Companion.toMediaTypeOrNull
import okhttp3.OkHttpClient
import okhttp3.Request
import okhttp3.RequestBody
import okhttp3.RequestBody.Companion.toRequestBody
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
    fun initAi():String{
        val  json= apiCall.call(UserModel.toGenAccount());
        println(json)
        if (json != null) {
            json.trimIndent()
            val chatStruct = Gson().fromJson(json, ChatStruct::class.java)
            val userAccount = Gson().fromJson(chatStruct.choices.get(0).message.content, UserModel.UserAccount::class.java)
            println(chatStruct)
            println(userAccount)
            userAccount.password="123456"
            userAccount.type="AI"
            //send register request
            val client = OkHttpClient()
            val url = "http://localhost:8080/api/users/register"
            val params = Gson().toJson(userAccount)
            val requestBody = params.toRequestBody("application/json".toMediaTypeOrNull())
            val request = Request.Builder()
                .url(url)
                .post(requestBody)
                .build()

            val response = client.newCall(request).execute()
            println(response.code)
            println(response.body?.string())
        }
        return "Done"
    }
}