package com.mars.social.controller

import cn.dev33.satoken.annotation.SaCheckLogin
import cn.dev33.satoken.stp.StpUtil
import com.mars.social.dto.PageDTO
import com.mars.social.dto.PageRequest
import com.mars.social.model.mix.Message
import com.mars.social.model.mix.Messages
import com.mars.social.model.topic.Topics
import com.mars.social.utils.PageCalculator
import com.mars.social.utils.R
import org.ktorm.database.Database
import org.ktorm.database.asIterable
import org.ktorm.dsl.*
import org.ktorm.entity.*
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*
import java.time.LocalDateTime

@CrossOrigin
@RestController
@RequestMapping("/api/msg")
class MessageController  {

    @Autowired
    protected lateinit var database: Database

    data class MessageDto(val to: Long, val content:String)
    @SaCheckLogin
    @PostMapping("send")
    fun send(@RequestBody dto:MessageDto):ResponseEntity<R> {
        val message:Message = Entity.create<Message>()
        message.msgType="u";
        message.senderId = StpUtil.getLoginId().toString()
        message.receiverUid = dto.to
        message.content = dto.content
        message.sendTime= LocalDateTime.now()
        message.status = "unCheck"
        message.mark = ""
        message.sysMsgType=""

        val messages = database.sequenceOf(Messages)
        messages.add(message)

        return ResponseEntity.ok().body(R.ok("message send"))
    }

    fun sendSysMsg(suid:Long,to:Long, content:String):Long{
        val message:Message = Entity.create<Message>()
        message.msgType="s";
        message.senderId = suid.toString()
        message.receiverUid = to
        message.content = content
        message.sendTime= LocalDateTime.now()
        message.status = "unCheck"
        message.mark = ""
        message.sysMsgType="notice"

        val messages = database.sequenceOf(Messages)
        messages.add(message)
        return message.id
    }

    fun retractMsg(msgId:Long){
        val messages = database.sequenceOf(Messages)
        messages.removeIf { it.id eq msgId }
    }

    //Current user, get top x different people message and check status.
    data class HistoryResult(val senderId: String, val senderNickName: String, val senderAvatar:String,
                             val status: String, val count: Int, val msgType:String, var lastMsg:String)
    @SaCheckLogin
    @GetMapping("history")
    fun history(@RequestParam size: Int):ResponseEntity<R>{
        val uid =StpUtil.getLoginId().toString().toLong()
        val historyList = database.useConnection { conn ->
            val sql = """
                SELECT t.sender_id, t.status, t.msg_type, t.count, COALESCE(ud.nick_name, 'unknown') AS senderNickName, 
                        COALESCE(ud.avatar, '') AS senderAvatar
                FROM (
                    SELECT m.sender_id, m.status,m.msg_type, COUNT(*) AS count
                    FROM embodied.messages m
                    WHERE m.receiver_uid = ?
                    GROUP BY m.sender_uid, m.status, m.msg_type
                    ORDER BY Max(m.id) DESC
                    LIMIT 0, ?
                ) AS t
                LEFT JOIN embodied.user_details ud ON ud.uid = t.sender_uid;
            """.trimIndent()
            conn.prepareStatement(sql).use { statement ->
                statement.setLong(1, uid)
                statement.setInt(2, size)
                statement.executeQuery().asIterable().map {
                    HistoryResult(
                        it.getString("sender_id"),
                        it.getString("senderNickName"),
                        it.getString("senderAvatar"),
                        it.getString("status"),
                        it.getInt("count"),
                        it.getString("msg_type"),
                        ""
                    )
                }
            }
        }
        for(history in historyList){
            var msg = database.from(Messages).select().where{ Messages.senderId eq history.senderId.toString()}.orderBy(Messages.id.desc())
                    .limit(1).map { row -> Messages.createEntity(row) }.firstOrNull()
            if (msg != null) {
                history.lastMsg = msg.content.toString()
            }
        }
        return ResponseEntity.ok().body(R.ok(historyList))
    }

    //Get Top x Message detail List from one user.
    @SaCheckLogin
    @PostMapping("getMsgPageData")
    fun getMsgPageData(@RequestBody pageRequest: PageRequest,@RequestParam suid: Long):ResponseEntity<R>{
        val ruid = StpUtil.getLoginId().toString().toLong()
        val totalRecords = database.sequenceOf(Messages).filter { it.senderId eq suid.toString() }
            .filter { it.status neq "deleted" }
            .filter { it.receiverUid eq ruid }
            .totalRecordsInAllPages
        val offset = PageCalculator.calculateOffset(pageRequest, totalRecords)
        val limit = PageCalculator.calculateLimit(pageRequest, totalRecords)

        val query = database.from(Messages).select()
            .where{ (Messages.senderId eq suid.toString()) and
                    (Messages.status neq "deleted") and
                    (Messages.receiverUid eq ruid) }
            .limit(offset, limit)
            .map { row -> Messages.createEntity(row) }

        query.forEach{ println(it) }

        val page = PageDTO(query.toList(),totalRecords,pageRequest)
        return ResponseEntity.ok().body(R.ok(page))
    }

    @SaCheckLogin
    @GetMapping("checkSenderMsg")
    fun checkSenderMsg(@RequestParam suid:Long):ResponseEntity<R>{
        val ruid = StpUtil.getLoginId().toString().toLong()
        database.batchUpdate(Messages){
            item{
                set(it.status,"checked")
                where{
                    (it.senderId eq suid.toString()) and (it.receiverUid eq ruid) and (it.status eq "unCheck")
                }
            }
        }

        return ResponseEntity.ok().body(R.ok("msg all checked"))
    }

//    @SaCheckLogin
//    @GetMapping("getUtuMsgHistoryList")
//    fun getUtuMsgHistoryList(){
//
//    }

}