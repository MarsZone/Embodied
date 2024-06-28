package com.mars.social.ai.api

import okhttp3.MediaType.Companion.toMediaType
import okhttp3.OkHttpClient
import okhttp3.Request
import okhttp3.RequestBody.Companion.toRequestBody
import org.json.JSONArray
import org.json.JSONObject
import org.springframework.stereotype.Component
import java.util.concurrent.TimeUnit

@Component
class ApiCall {
    fun call(context:String) {

        val request = toGenRequest(context)
        val client = OkHttpClient.Builder()
            .readTimeout(360, TimeUnit.SECONDS) // 设置读取超时时间为60秒
            .writeTimeout(360, TimeUnit.SECONDS) // 设置写入超时时间为60秒
            .build()

        val response = client.newCall(request).execute()

        if (response.isSuccessful) {
            println(response.body?.string())
        } else {
            println("Error: ${response.code}")
            println(response.body?.string()) // 输出服务器返回的具体错误信息
        }
    }
    fun toGenRequest(context:String) : Request{
        val apiUrl = "http://127.0.0.1:8000/v1/chat/completions"
        val apiKey = "token1" // 此处放置您的有效 API Key

        val jsonObject = JSONObject()
        jsonObject.put("model", "chatglm3-6b")

        val messagesArray = JSONArray()
//        val systemMessage = JSONObject().apply {
//            put("role", "assistant")
//            put("content", "You are ChatGLM3, a large language model trained by Zhipu.AI. Follow the user’s instructions carefully. Respond using markdown.")
//        }
        val firstMessage = JSONObject().apply {
            put("role", "user")
            put("content", "谁是乔治·华盛顿")
        }
        val responseMessage = JSONObject().apply {
            put("role", "assistant")
            put("content", "乔治·华盛顿（George Washington，1732年2月22日－1799年12月14日）是美国的一位政治家、将军和农民，也是美国独立战争期间的指挥官，还是美国第一任总统。他被认为是美国历史上最伟大的领袖之一，因为他在美国革命战争中取得了重要的胜利，并且建立了许多重要的政治制度。他还被认为是一位优秀的领袖，他的领导能力和道德品质对美国的发展产生了深远")
        }
        val userMessage = JSONObject().apply {
            put("role", "user")
            put("content", "他是什么时候出生的")
        }
//        messagesArray.put(systemMessage)
        messagesArray.put(firstMessage)
        messagesArray.put(responseMessage)
        messagesArray.put(userMessage)

        jsonObject.put("messages", messagesArray)
        jsonObject.put("stream", false)
        jsonObject.put("max_tokens", 100)
        jsonObject.put("temperature", 0.8)
        jsonObject.put("top_p", 0.8)


        val mediaType = "application/json; charset=utf-8".toMediaType()
        //val requestBody = requestBodyString.toRequestBody(mediaType)
        val requestBody = jsonObject.toString().toRequestBody(mediaType)

        val request = Request.Builder()
            .url(apiUrl)
            .post(requestBody)
            .addHeader("Authorization", "Bearer $apiKey")
            .build()
        return request
    }
}


//    val requestBodyString = """
//        {
//            "model": "chatglm3-6b",
//            "messages": [
//                {
//                    "role": "system",
//                    "content": "You are ChatGLM3, a large language model trained by Zhipu.AI. Follow the user’s instructions carefully. Respond using markdown."
//                },
//                {
//                    "role": "user",
//                    "content": "你好"
//                }
//            ],
//            "stream": false,
//            "max_tokens": 100,
//            "temperature": 0.8,
//            "top_p": 0.8
//        }
//    """.trimIndent()