package com.mars.social.model

import org.ktorm.entity.Entity
import org.ktorm.schema.*
import java.time.*

interface Content : Entity<Content> {
	var id: Long?
	var authorUid: Long?
	var contentType: String?
	var content: String
	var publishTime: LocalDateTime
	var status: String?
	var likes: Int
	var comments: Int
	var shares: Int
	var createTime: LocalDateTime
	var updateTime: LocalDateTime
}

object Contents : Table<Content>("content") {
	val id = long("id").bindTo { it.id }
	val authorUid = long("author_uid").bindTo { it.authorUid }
	val contentType = varchar("content_type").bindTo { it.contentType }
	val content = varchar("content").bindTo { it.content }
	val publishTime = datetime("publish_time").bindTo { it.publishTime }
	val status = varchar("status").bindTo { it.status }
	val likes = int("likes").bindTo { it.likes }
	val comments = int("comments").bindTo { it.comments }
	val shares = int("shares").bindTo { it.shares }
	val createTime = datetime("create_time").bindTo { it.createTime }
	val updateTime = datetime("update_time").bindTo { it.updateTime }
}