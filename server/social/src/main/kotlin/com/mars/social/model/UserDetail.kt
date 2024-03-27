package com.mars.social.model

import org.ktorm.entity.Entity
import org.ktorm.schema.*
import java.time.*

interface UserDetail : Entity<UserDetail> {
    var id: Long?
    var uid: Long
    var firstName: String
    var secondName: String
    var nickName: String
    var gender: String
    var birthdate: LocalDate
    var country: String
    var city: String
    var address: String
    var avatar: String
    var createTime: LocalDateTime
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
}