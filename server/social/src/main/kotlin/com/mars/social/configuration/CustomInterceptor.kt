package com.mars.social.configuration

import jakarta.servlet.http.HttpServletRequest
import jakarta.servlet.http.HttpServletResponse
import org.springframework.web.servlet.HandlerInterceptor
import org.springframework.web.servlet.ModelAndView
import java.time.LocalDateTime
import java.time.format.DateTimeFormatter

class CustomInterceptor : HandlerInterceptor {
    override fun preHandle(request: HttpServletRequest, response: HttpServletResponse, handler: Any): Boolean {
        val startTime = System.currentTimeMillis()
        request.setAttribute("startTime", startTime)
        return true
    }

    override fun postHandle(request: HttpServletRequest, response: HttpServletResponse, handler: Any, modelAndView: ModelAndView?) {
        val startTime = request.getAttribute("startTime") as Long
        val endTime = System.currentTimeMillis()
        val requestTime = endTime - startTime

        val currentTime = LocalDateTime.now()
        val formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss")
        val formattedTime = currentTime.format(formatter)

        var ip = request.getHeader("x-forwarded-for")
        if (ip.isNullOrEmpty() || "unknown".equals(ip, ignoreCase = true)) {
            ip = request.getHeader("Proxy-Client-IP")
        }
        if (ip.isNullOrEmpty() || "unknown".equals(ip, ignoreCase = true)) {
            ip = request.getHeader("WL-Proxy-Client-IP")
        }
        if (ip.isNullOrEmpty() || "unknown".equals(ip, ignoreCase = true)) {
            ip = request.remoteAddr
        }
        val userAgent = request.getHeader("User-Agent")

        println("Request URL: ${request.requestURL}, Request Time: $requestTime ms, Time: $formattedTime, IP Address: $ip, User Agent: $userAgent")
    }
}