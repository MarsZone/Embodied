package com.mars.social.controller;

import java.io.IOException;
import java.util.List;
import java.util.concurrent.ConcurrentHashMap;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;
import com.mars.social.model.mix.Message;
import com.mars.social.model.mix.MessageBean;
import com.mars.social.model.mix.SocketMessage;
import com.mars.social.utils.R;
import jakarta.websocket.server.ServerEndpoint;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationContext;
import org.springframework.http.ResponseEntity;
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

    private ApplicationContext context;

    @Autowired
    public void setContext(ApplicationContext context) {
        this.context = context;
    }

    // 监听：连接开启
    @Override
    public void afterConnectionEstablished(WebSocketSession session) throws Exception {

        // put到集合，方便后续操作
        String userId = session.getAttributes().get("userId").toString();
        webSocketSessionMaps.put(USER_ID + userId, session);

        // 给个提示
//        String tips = "Web-Socket 连接成功，sid=" + session.getId() + "，userId=" + userId;
//        String response = " {\"code\":20000,\"message\":\"成功\",\"data\":{"+tips+"}}";
        String response = "连接成功";
//        System.out.println(tips);
        sendMessage(session, response);
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
        objectMapper.registerModule(new JavaTimeModule());
        socketMessage = objectMapper.readValue(rawText.getPayload(),SocketMessage.class);

        String command = socketMessage.getCommand();
        String userId = session.getAttributes().get("userId").toString();
        Long TargetUser = Long.valueOf(socketMessage.getTargetUser());
        String msg = socketMessage.getMessage();
        if(command.equals("10100")){
            String response = " {\"code\":20000,\"message\":\"成功\",\"data\":{"+msg+"}}";
            this.broadcastMessage(response);
        }
        if(command.equals("10200")){
            MessageController messageController = context.getBean(MessageController.class);
            MessageController.MessageSDto messageSDto = new MessageController.MessageSDto(userId,TargetUser, msg);
            String message = messageController.serverSend(messageSDto);
            MessageBean bean = objectMapper.readValue(message,MessageBean.class);
            R r = R.Companion.ok(bean);
            String jsonStr = objectMapper.writeValueAsString(r);
            sendMessage(2,jsonStr);
            sendMessage(TargetUser,jsonStr);
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
