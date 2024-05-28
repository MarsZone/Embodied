package com.mars.social.model.mix;

import lombok.Data;

import java.time.LocalDateTime;

@Data
public class MessageBean {
    private long id;
    private String msgType;
    private String senderId;
    private long receiverUid;
    private String content;
    private LocalDateTime sendTime;
    private String status;
    private String mark;
    private String sysMsgType;
    private LocalDateTime receiveTime;
    private LocalDateTime deleteTime;

}
