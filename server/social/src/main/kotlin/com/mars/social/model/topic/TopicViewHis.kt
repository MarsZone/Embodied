package com.mars.social.model.topic

import com.mars.social.model.topic.TopicLikes.bindTo
import com.mars.social.model.topic.TopicLikes.primaryKey
import org.ktorm.entity.Entity
import org.ktorm.schema.Table
import org.ktorm.schema.datetime
import org.ktorm.schema.long
import java.time.LocalDateTime

interface TopicViewHis : Entity<TopicViewHis> {
    var id :Long
    var uid : Long
    var tid: Long
    var createTime : LocalDateTime
}

object TopicViewHisDB : Table<TopicViewHis>("topic_view_his"){
    val id = long("id").primaryKey().bindTo { it.id }
    val uid = long("uid").bindTo { it.uid }
    val tid = long("tid").bindTo { it.tid }
    val createTime = datetime("create_time").bindTo { it.createTime }
}