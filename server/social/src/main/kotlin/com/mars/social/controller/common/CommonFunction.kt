package com.mars.social.controller.common

import com.mars.social.controller.UserController
import com.mars.social.model.topic.Topic

class CommonFunction {
    companion object {
        fun setTopicUserInfo(topic: Topic, userInfo:UserController.UserInfoDto?) {
            if (userInfo != null) {
                topic.authorNickName = userInfo.nickName.toString()
            }
            if (userInfo != null) {
                topic.authorAvatar = userInfo.avatar.toString()
            }
        }
    }
}