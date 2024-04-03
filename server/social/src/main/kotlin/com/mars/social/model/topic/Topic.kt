package com.mars.social.model.topic

import org.ktorm.entity.Entity
import org.ktorm.schema.*
import java.time.*

interface Topic : Entity<Topic> {
	var id: Long
	var title : String?
	var authorUid: Long?
	var contentType: String?
	var content: String
	var publishTime: LocalDateTime
	var status: String?
	var likes: Int
	var comments: Int
	var shares: Int
	var bookmarks: Int
	var createTime: LocalDateTime
	var updateTime: LocalDateTime
	var isDelete: String
	var visits: Long
}

object Topics : Table<Topic>("topic") {
	val id = long("id").primaryKey().bindTo { it.id }
	val title = varchar("title").bindTo { it.title }
	val authorUid = long("author_uid").bindTo { it.authorUid }
	val contentType = varchar("content_type").bindTo { it.contentType }
	val content = varchar("content").bindTo { it.content }
	val publishTime = datetime("publish_time").bindTo { it.publishTime }
	val status = varchar("status").bindTo { it.status }
	val likes = int("likes").bindTo { it.likes }
	val comments = int("comments").bindTo { it.comments }
	val shares = int("shares").bindTo { it.shares }
	val bookmarks = int("bookmarks").bindTo { it.bookmarks }
	val createTime = datetime("create_time").bindTo { it.createTime }
	val updateTime = datetime("update_time").bindTo { it.updateTime }
	val isDelete = varchar("is_delete").bindTo { it.isDelete }
	val visits = long("visits").bindTo { it.visits }
}