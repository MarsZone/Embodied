package com.mars.social.security

import cn.dev33.satoken.interceptor.SaInterceptor
import org.springframework.context.annotation.Configuration
import org.springframework.web.servlet.config.annotation.InterceptorRegistry
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer

@Configuration
class SaTokenConfigure : WebMvcConfigurer {
    // 注册 Sa-Token 拦截器，打开注解式鉴权功能
    override fun addInterceptors(registry: InterceptorRegistry) {
        // 注册 Sa-Token 拦截器，打开注解式鉴权功能
        registry.addInterceptor(SaInterceptor()).addPathPatterns("/**")
    }
}