package com.mars.social.controller
import okhttp3.MediaType.Companion.toMediaType
import okhttp3.OkHttpClient
import okhttp3.Request
import okhttp3.RequestBody.Companion.toRequestBody
import org.json.JSONArray
import org.json.JSONObject
import org.springframework.stereotype.Component
import java.util.concurrent.TimeUnit

@Component
class   ApiCall{
    fun call() {
        val apiUrl = "http://127.0.0.1:8000/v1/chat/completions"
        val apiKey = "EMPTY" // 此处放置您的有效 API Key

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

        val jsonObject = JSONObject()
        jsonObject.put("model", "chatglm3-6b")

        val messagesArray = JSONArray()
        val systemMessage = JSONObject().apply {
            put("role", "system")
            put("content", "You are ChatGLM3, a large language model trained by Zhipu.AI. Follow the user’s instructions carefully. Respond using markdown.")
        }
        val userMessage = JSONObject().apply {
            put("role", "user")
            put("content", "你好")
        }
        messagesArray.put(systemMessage)
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

}
