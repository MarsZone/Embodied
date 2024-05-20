package com.mars.social.configuration;

import com.mars.social.controller.WebSocketConnect;
import com.mars.social.interceptor.WebSocketInterceptor;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.socket.config.annotation.*;

@Configuration
@EnableWebSocket
public class WebSocketConfig implements WebSocketConfigurer{

    // 注册 WebSocket 处理器
    @Override
    public void registerWebSocketHandlers(WebSocketHandlerRegistry webSocketHandlerRegistry) {
        webSocketHandlerRegistry
                // WebSocket 连接处理器
                .addHandler(new WebSocketConnect(), "/ws-connect")
                // WebSocket 拦截器
                .addInterceptors(new WebSocketInterceptor())
                // 允许跨域
                .setAllowedOrigins("*");
    }

}