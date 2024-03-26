package com.mars.social.model

import org.ktorm.entity.Entity
import org.ktorm.schema.Table
import org.ktorm.schema.long
import org.ktorm.schema.varchar

interface UserRole : Entity<UserRole> {
    val id: Long
    val uid: Long
    val role: String
}
object UserRoles : Table<UserRole>("user_role") {
    val id = long("id").primaryKey().bindTo { it.id }
    val uid = long("uid").bindTo { it.uid }
    val role = varchar("role").bindTo { it.role }
}