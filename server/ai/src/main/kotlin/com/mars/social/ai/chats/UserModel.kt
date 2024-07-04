package com.mars.social.ai.chats

class UserModel {
    companion object {
        fun toGenAccount():String{
            val chat = "请参考以下格式，返回随机的\tuserName,password,email,phone，信息\n" +
                    "{\n" +
                    "    \"userName\": \"Christopher Young\",\n" +
                    "    \"password\": \"123456\",\n" +
                    "    \"email\": \"Christopher@demo.com.cn\",\n" +
                    "    \"phone\": \"18600035806\"\n" +
                    "}";
            return chat;
        }
    }
}