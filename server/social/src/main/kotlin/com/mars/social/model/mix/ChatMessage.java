package com.mars.social.model.mix;

import lombok.Data;

import java.time.LocalDateTime;

@Data
public class ChatMessage {
    private String content;
    private String sender;
    private LocalDateTime timeStamp = LocalDateTime.now();

    public enum MessageType {LEAVE, CHAT, JOIN}

    private MessageType type;
}