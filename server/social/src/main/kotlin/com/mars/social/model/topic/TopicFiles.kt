package com.mars.social.model.topic

import org.ktorm.entity.Entity
import org.ktorm.schema.Table
import org.ktorm.schema.datetime
import org.ktorm.schema.long
import org.ktorm.schema.varchar
import java.time.LocalDateTime

interface TopicFile : Entity<TopicFile> {
    var id: Long
    var uid: Long
    var tid: Long
    var fid: Long
    var fileType:String
    var fileDesc:String
    var createTime: LocalDateTime
    var updateTime: LocalDateTime
    var isDelete:String

}

object TopicFiles : Table<TopicFile>("topic_files") {
    val id = long("id").primaryKey().bindTo { it.id }
    val uid = long("uid").bindTo { it.uid }
    val tid = long("tid").bindTo { it.tid }
    val fid = long("fid").bindTo { it.fid }
    val fileType = varchar("file_type").bindTo { it.fileType }
    val fileDesc = varchar("file_desc").bindTo { it.fileDesc }
    val createTime = datetime("create_time").bindTo { it.createTime }
    val updateTime = datetime("update_time").bindTo { it.updateTime }
    val isDelete = varchar("is_delete").bindTo { it.isDelete }
}