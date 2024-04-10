package com.mars.social.model.mix

import org.ktorm.entity.Entity
import org.ktorm.schema.Table
import org.ktorm.schema.datetime
import org.ktorm.schema.long
import org.ktorm.schema.varchar
import java.time.LocalDateTime

interface File : Entity<File> {
    var id: Long
    var fileName: String
    var originalFileName: String
    var createTime: LocalDateTime
}

object Files : Table<File>("files") {
    val id = long("id").primaryKey().bindTo { it.id }
    val fileName = varchar("file_name").bindTo { it.fileName }
    val originalFileName = varchar("original_file_name").bindTo { it.originalFileName }
    val createTime = datetime("create_time").bindTo { it.createTime }
}