package com.mars.social.configuration;

import cn.dev33.satoken.stp.StpUtil;
import com.mars.social.controller.WebSocketConnect;
import com.mars.social.interceptor.WebSocketInterceptor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationContext;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.socket.config.annotation.*;

@Configuration
@EnableWebSocket
public class WebSocketConfig implements WebSocketConfigurer{

    @Autowired
    ApplicationContext context;
    // 注册 WebSocket 处理器
    @Override
    public void registerWebSocketHandlers(WebSocketHandlerRegistry webSocketHandlerRegistry) {
        WebSocketConnect connectHandler = new WebSocketConnect();
        WebSocketInterceptor webSocketInterceptor = new WebSocketInterceptor();
        connectHandler.setContext(context);
        webSocketHandlerRegistry
                // WebSocket 连接处理器
                .addHandler(connectHandler, "/ws-connect")
                // WebSocket 拦截器
                .addInterceptors(new WebSocketInterceptor())
                // 允许跨域
                .setAllowedOrigins("*");
    }

}