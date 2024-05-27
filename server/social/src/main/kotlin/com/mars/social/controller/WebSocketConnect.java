package com.mars.social.controller;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.mars.social.model.mix.SocketMessage;
import jakarta.websocket.server.ServerEndpoint;
import org.springframework.stereotype.Component;

import org.springframework.web.socket.CloseStatus;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.TextWebSocketHandler;

@Component
@ServerEndpoint("/ws-connect/{satoken}")
public class WebSocketConnect extends TextWebSocketHandler {
    /**
     * 固定前缀
     */
    private static final String USER_ID = "user_id_";

    /**
     * 存放Session集合，方便推送消息
     */
    private static ConcurrentHashMap<String, WebSocketSession> webSocketSessionMaps = new ConcurrentHashMap<>();


    // 监听：连接开启
    @Override
    public void afterConnectionEstablished(WebSocketSession session) throws Exception {

        // put到集合，方便后续操作
        String userId = session.getAttributes().get("userId").toString();
        webSocketSessionMaps.put(USER_ID + userId, session);


        // 给个提示
        String tips = "Web-Socket 连接成功，sid=" + session.getId() + "，userId=" + userId;
        System.out.println(tips);
        sendMessage(session, tips);
    }

    // 监听：连接关闭
    @Override
    public void afterConnectionClosed(WebSocketSession session, CloseStatus status) throws Exception {
        // 从集合移除
        String userId = session.getAttributes().get("userId").toString();
        webSocketSessionMaps.remove(USER_ID + userId);

        // 给个提示
        String tips = "Web-Socket 连接关闭，sid=" + session.getId() + "，userId=" + userId;
        System.out.println(tips);
    }

    // 收到消息
    @Override
    public void handleTextMessage(WebSocketSession session, TextMessage rawText) throws IOException {
        System.out.println("sid为：" + session.getId() + "，发来：" + rawText);
        SocketMessage socketMessage = new SocketMessage();
        ObjectMapper objectMapper = new ObjectMapper();
        socketMessage = objectMapper.readValue(rawText.getPayload(),SocketMessage.class);

        String command = socketMessage.getCommand();
        String target = socketMessage.getTargetUser();
        String msg = socketMessage.getMessage();
        if(command.equals("10100")){
            this.broadcastMessage(msg);
        }
        if(command.equals("10200")){
            sendMessage(Long.parseLong(target),msg);
        }
    }

    // -----------

    // 向指定客户端推送消息
    public static void sendMessage(WebSocketSession session, String message) {
        try {
            System.out.println("向sid为：" + session.getId() + "，发送：" + message);
            session.sendMessage(new TextMessage(message));
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
    }

    // 向指定用户推送消息
    public static void sendMessage(long userId, String message) {
        WebSocketSession session = webSocketSessionMaps.get(USER_ID + userId);
        if(session != null) {
            sendMessage(session, message);
        }
    }

    public void broadcastMessage(String message) {
        for (WebSocketSession session : webSocketSessionMaps.values()) {
            try {
                session.sendMessage(new TextMessage(message));
            } catch (IOException e) {
                e.printStackTrace();
            }
        }
    }
}
