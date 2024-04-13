package com.mars.social.controller

import cn.dev33.satoken.annotation.SaCheckLogin
import cn.dev33.satoken.stp.StpUtil
import com.mars.social.model.mix.Message
import com.mars.social.model.mix.Messages
import com.mars.social.utils.R
import org.ktorm.database.Database
import org.ktorm.database.asIterable
import org.ktorm.entity.Entity
import org.ktorm.entity.add
import org.ktorm.entity.sequenceOf
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
        val message:Message = Entity.create<Message >()
        message.msgType="u";
        message.senderUid = StpUtil.getLoginId().toString().toLong()
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

    //Current user, get top x different people message and check status.
    data class HistoryResult(val senderUid: String, val status: String, val count: Int)
    @SaCheckLogin
    @GetMapping("history")
    fun history(@RequestParam size: Int):ResponseEntity<R>{
        val uid =StpUtil.getLoginId().toString().toLong()
        val historyList = database.useConnection { conn ->
            val sql = """
                SELECT m.sender_uid, m.status, COUNT(*) AS count from embodied.messages m
                where status = 'unCheck' and receiver_uid = ?
                GROUP BY m.sender_uid, m.status
                ORDER BY MAX(id) DESC
                limit 0,?
            """.trimIndent()
            conn.prepareStatement(sql).use { statement ->
                statement.setLong(1, uid)
                statement.setInt(2, size)
                statement.executeQuery().asIterable().map {
                    HistoryResult(
                        it.getString("sender_uid"),
                        it.getString("status"),
                        it.getInt("count")
                    )
                }
            }
        }
        historyList.forEach{println(it)}
        return ResponseEntity.ok().body(R.ok(historyList))
    }

    //Get Unread Top 10 Message List

}