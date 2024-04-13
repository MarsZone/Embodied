package com.mars.social.model.topic

import org.ktorm.entity.Entity
import org.ktorm.schema.*
import java.time.*

interface TopicComment : Entity<TopicComment> {
	var id: Long
	var tid: Long			//topic id
	var uid: Long
	var content: String?	//内容
	var replyId: Long		//回复的评论id，默认-1，表示回复的是当前文章
	var createTime: LocalDateTime
}

object TopicComments : Table<TopicComment>("topic_comment") {
    val id = long("id").bindTo { it.id }
	val tid = long("tid").bindTo { it.tid }
	val uid = long("uid").bindTo { it.uid }
	val content = varchar("content").bindTo { it.content }
	val replyId = long("reply_id").bindTo { it.replyId }
	val createTime = datetime("create_time").bindTo { it.createTime }
}