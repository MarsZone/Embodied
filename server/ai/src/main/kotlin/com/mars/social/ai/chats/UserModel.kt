package com.mars.social.ai.chats

class UserModel {
    companion object {
        fun toGenAccount():String{
            val chat = "请参考以下格式，返回随机的\tuserName,password,email,phone，信息,userName 使用10位长度随机英文字母生成\n" +
                    "{\n" +
                    "    \"userName\": \"Christopher Young\",\n" +
                    "    \"password\": \"123456\",\n" +
                    "    \"email\": \"Christopher@demo.com.cn\",\n" +
                    "    \"phone\": \"18600035806\"\n" +
                    "}";
            return chat;
        }
    }
    data class UserAccount(
        val userName: String,
        var password: String,
        val email: String,
        val phone: String,
        var type:String = "AI",
    )
}
