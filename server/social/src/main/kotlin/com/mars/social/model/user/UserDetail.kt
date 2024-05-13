package com.mars.social.model.user

import org.ktorm.entity.Entity
import org.ktorm.schema.*
import java.time.*

interface UserDetail : Entity<UserDetail> {
    var id: Long
    var uid: Long
    var firstName: String           //姓
    var secondName: String          //名
    var nickName: String            //昵称
    var gender: String              //性别
    var birthdate: LocalDate        //出生日期
    var country: String             //国籍
    var city: String                //城市
    var address: String             //住址
    var avatar: String              //头像，先存链接吧，后面要想想怎么弄个OSS存储
    var createTime: LocalDateTime
    var signature: String           //个性签名
}

object UserDetails : Table<UserDetail>("user_details") {
    val id = long("id").primaryKey().bindTo { it.id }
    val uid = long("uid").bindTo { it.uid }
    val firstName = varchar("first_name").bindTo { it.firstName }
    val secondName = varchar("second_name").bindTo { it.secondName }
    val nickName = varchar("nick_name").bindTo { it.nickName }
    val gender = varchar("gender").bindTo { it.gender }
    val birthdate = date("birthdate").bindTo { it.birthdate }
    val country = varchar("country").bindTo { it.country }
    val address = varchar("address").bindTo { it.address }
    val avatar = varchar("avatar").bindTo { it.avatar }
    val createTime = datetime("create_time").bindTo { it.createTime }
    val signature = varchar("signature").bindTo { it.signature }
}