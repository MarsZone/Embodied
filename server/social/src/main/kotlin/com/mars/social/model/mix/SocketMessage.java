package com.mars.social.model.mix;

import lombok.Data;

@Data
public class SocketMessage {
    String command;
    String targetUser;
    String message;
}
