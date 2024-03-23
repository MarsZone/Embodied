package com.mars.social.configuration

import jakarta.servlet.http.HttpServletRequest
import jakarta.servlet.http.HttpServletResponse
import org.springframework.web.servlet.HandlerInterceptor

class CustomInterceptor : HandlerInterceptor {

    override fun afterCompletion(request: HttpServletRequest, response: HttpServletResponse, handler: Any, ex: Exception?) {
        // 设置响应头
        response.setHeader("Access-Control-Expose-Headers", "Authorization")
    }
}