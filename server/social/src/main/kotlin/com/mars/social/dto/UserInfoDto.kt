package com.mars.social.dto

import com.mars.social.model.user.UserDetail


data class UserInfoDto (
    var userName:String ="",
    var email:String ="",
    var phone:String ="",
    val userDetail:UserDetail?,
)