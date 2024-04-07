package com.mars.social.model.topic

import org.ktorm.entity.Entity
import org.ktorm.schema.*
import java.time.*

interface TopicLike : Entity<TopicLike> {
    var id: Long
	var tid: Long					//topic外键
	var uid: Long					//用户外键
	var createTime: LocalDateTime
}

object TopicLikes : Table<TopicLike>("topic_like") {
	val id = long("id").primaryKey().bindTo { it.id }
	val tid = long("tid").bindTo { it.tid }
	val uid = long("uid").bindTo { it.uid }
	val createTime = datetime("create_time").bindTo { it.createTime }
}