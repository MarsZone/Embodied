package com.mars.social.utils

data class R(
    var code: Int,
    var message: String,
    var data: Any?
)
{
    companion object {
        fun ok(data: Any): R {
            return R(20000, "成功", data)
        }
        fun ok(message: String, data: Any?): R {
            return R(20000, "成功", data)
        }
        fun fail(message: String): R {
            return R(30000, message, {})
        }
        fun fail(message: String, data: Any?): R {
            return R(30000, message, data ?: "System Error")
        }
    }
}