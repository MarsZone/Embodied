package com.mars.social.model.mix

import org.ktorm.entity.Entity
import org.ktorm.schema.Table
import org.ktorm.schema.long
import org.ktorm.schema.varchar

interface Tag : Entity<Tag> {
    var id: Long
    var tagName: String
}

object Tags : Table<Tag>("tags") {
    val id = long("id").primaryKey().bindTo { it.id }
    val tagName = varchar("tag_name").bindTo { it.tagName }
}