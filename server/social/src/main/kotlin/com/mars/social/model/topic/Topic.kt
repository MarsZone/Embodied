package com.mars.social.model.topic

import org.ktorm.entity.Entity
import org.ktorm.schema.*
import java.time.*

interface Topic : Entity<Topic> {
	var id: Long
	var title : String?				//标题
	var authorUid: Long?			//作者UID
	var contentType: String?		//内容类型，先都默认是text
	var content: String				//内容
	var publishTime: LocalDateTime	//发布日期
	var status: String?				//状态，草稿，已发布
	var likes: Int					//赞
	var comments: Int				//注释
	var shares: Int					//分享
	var bookmarks: Int				//收藏
	var createTime: LocalDateTime
	var updateTime: LocalDateTime
	var isDelete: String			//是否删除
	var visits: Long				//访问
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