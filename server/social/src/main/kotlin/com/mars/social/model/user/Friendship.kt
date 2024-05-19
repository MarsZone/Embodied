package com.mars.social.model.user

import org.ktorm.entity.Entity
import org.ktorm.schema.*
import java.time.*

interface Friendship : Entity<Friendship> {
	var id: Long
	var uidSource: Long				//源用户
	var uidTo: Long					//目标用户
	var status: String?				//applying,friends,rejected,blocked
	var rejectReason: String?		//拒绝原因
	var createTime: LocalDateTime
	var updateTime: LocalDateTime
	var msgId: Long
}

object Friendships : Table<Friendship>("friendships") {
	val id = long("id").primaryKey().bindTo { it.id }
	val uidSource = long("uid_source").bindTo { it.uidSource }
	val uidTo = long("uid_to").bindTo { it.uidTo }
	val status = varchar("status").bindTo { it.status }
	val rejectReason = varchar("reject_reason").bindTo { it.rejectReason }
	val createTime = datetime("create_time").bindTo { it.createTime }
	val updateTime = datetime("update_time").bindTo { it.updateTime }
	val msgId = long("msg_id").bindTo { it.msgId }
}