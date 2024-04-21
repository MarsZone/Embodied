package com.mars.social.model.mix

import com.mars.social.model.user.Friendships.bindTo
import com.mars.social.model.user.Friendships.primaryKey
import org.ktorm.entity.Entity
import org.ktorm.schema.Table
import org.ktorm.schema.datetime
import org.ktorm.schema.long
import java.time.LocalDateTime

interface BookMark : Entity<BookMark> {
    var id:Long
    var uid:Long
    var tid:Long
    var createTime:LocalDateTime
}


object BookMarks : Table<BookMark>("bookmarks"){
    val id = long("id").primaryKey().bindTo { it.id }
    val uid = long("uid").bindTo { it.uid }
    val tid = long("tid").bindTo { it.tid }
    val createTime = datetime("create_time").bindTo { it.createTime }
}