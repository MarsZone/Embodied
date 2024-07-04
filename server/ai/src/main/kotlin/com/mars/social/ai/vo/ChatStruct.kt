package com.mars.social.ai.vo

import com.google.gson.annotations.SerializedName

data class ChatStruct(
    @SerializedName("model") val model: String,
    @SerializedName("id") val id: String,
    @SerializedName("object") val objectType: String,
    @SerializedName("choices") val choices: List<Choice>,
    @SerializedName("created") val created: Long,
    @SerializedName("usage") val usage: Usage
)

data class Choice(
    @SerializedName("index") val index: Int,
    @SerializedName("message") val message: Message,
    @SerializedName("finish_reason") val finishReason: String
)

data class Message(
    @SerializedName("role") val role: String,
    @SerializedName("content") val content: String,
    @SerializedName("name") val name: String?,
    @SerializedName("function_call") val functionCall: String?
)

data class Usage(
    @SerializedName("prompt_tokens") val promptTokens: Int,
    @SerializedName("total_tokens") val totalTokens: Int,
    @SerializedName("completion_tokens") val completionTokens: Int
)