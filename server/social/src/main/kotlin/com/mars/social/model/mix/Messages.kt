package com.mars.social.model.mix

import org.ktorm.entity.Entity
import org.ktorm.schema.*
import java.time.*

interface Message : Entity<Message> {
	var id: Long
	var msgType: String?			//默认u，u 用户消息 s 系统消息
	var senderId: String?				//发送人ID，系统的是0
	var receiverUid: Long			//收件人ID
	var content: String?			//
	var sendTime: LocalDateTime		//发送日期
	var status: String?				//unCheck checked deleted
	var mark: String?				//important top
	var sysMsgType: String?			//先默认都是notice
	var receiveTime: LocalDateTime	//阅读时间
	var deleteTime: LocalDateTime	//删除时间
}

object Messages : Table<Message>("messages") {
	val id = long("id").primaryKey().bindTo { it.id }
	val msgType = varchar("msg_type").bindTo { it.msgType }
	val senderId = varchar("sender_id").bindTo { it.senderId }
	val receiverUid = long("receiver_uid").bindTo { it.receiverUid }
	val content = varchar("content").bindTo { it.content }
	val sendTime = datetime("send_time").bindTo { it.sendTime }
	val status = varchar("status").bindTo { it.status }
	val mark = varchar("mark").bindTo { it.mark }
	val sysMsgType = varchar("sys_msg_type").bindTo { it.sysMsgType }
	val receiveTime = datetime("receive_time").bindTo { it.receiveTime }
	val deleteTime = datetime("delete_time").bindTo { it.deleteTime }
}