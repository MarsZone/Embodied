package com.mars.social.model.user

import org.ktorm.entity.Entity
import org.ktorm.schema.*
import java.time.LocalDateTime

interface User : Entity<User> {
    val id: Long
    var userName: String
    var password: String
    var email: String
    var phone: String
    var registerTime: LocalDateTime
    var lastLoginTime: LocalDateTime
    var isActive: String
}

object Users : Table<User>("user") {
    val id = long("id").primaryKey().bindTo { it.id }
    val userName = varchar("user_name").bindTo { it.userName }
    val password = varchar("password").bindTo { it.password }
    val email = varchar("email").bindTo { it.email }
    val phone = varchar("phone").bindTo { it.phone }
    val registerTime = datetime("register_time").bindTo { it.registerTime }
    val lastLoginTime = datetime("last_login_time").bindTo { it.lastLoginTime }
    val isActive = varchar("is_active").bindTo { it.isActive }
}