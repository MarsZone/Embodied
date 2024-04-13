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
    data class HistoryResult(val senderUid: String, val status: String, val count: Int, val string: String)
    @SaCheckLogin
    @GetMapping("history")
    fun history(@RequestParam size: Int):ResponseEntity<R>{
        val uid =StpUtil.getLoginId().toString().toLong()
        val historyList = database.useConnection { conn ->
            val sql = """
                SELECT t.sender_uid, t.status, t.count, COALESCE(ud.nick_name, 'unknown') AS nick_name
                FROM (
                    SELECT m.sender_uid, m.status, COUNT(*) AS count
                    FROM embodied.messages m
                    WHERE m.receiver_uid = ?
                    GROUP BY m.sender_uid, m.status
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
                        it.getString("sender_uid"),
                        it.getString("status"),
                        it.getInt("count"),
                        it.getString("nick_name")
                    )
                }
            }
        }
        historyList.forEach{println(it)}
        return ResponseEntity.ok().body(R.ok(historyList))
    }

    //Get Top x Message detail List from one user.
    @SaCheckLogin
    @PostMapping("getMsgPageData")
    fun getMsgPageData(@RequestBody pageRequest: PageRequest,@RequestParam suid: Long):ResponseEntity<R>{
        val ruid = StpUtil.getLoginId().toString().toLong()
        val totalRecords = database.sequenceOf(Messages).filter { it.senderUid eq suid }
            .filter { it.status neq "deleted" }
            .filter { it.receiverUid eq ruid }
            .totalRecordsInAllPages
        val offset = PageCalculator.calculateOffset(pageRequest, totalRecords)
        val limit = PageCalculator.calculateLimit(pageRequest, totalRecords)

        val query = database.from(Messages).select()
            .where{ (Messages.senderUid eq suid) and
                    (Messages.status neq "deleted") and
                    (Messages.receiverUid eq ruid) }
            .limit(offset, limit)
            .map { row -> Messages.createEntity(row) }

        query.forEach{ println(it) }

        val page = PageDTO(query.toList(),totalRecords,pageRequest)
        return ResponseEntity.ok().body(R.ok(page))
    }

    //写的一般，暂时这样
    @SaCheckLogin
    @GetMapping("checkSenderMsg")
    fun checkSenderMsg(@RequestParam suid:Long):ResponseEntity<R>{
        val ruid = StpUtil.getLoginId().toString().toLong()
        database.batchUpdate(Messages){
            item{
                set(it.status,"checked")
                where{
                    (it.senderUid eq suid) and (it.receiverUid eq ruid) and (it.status eq "unCheck")
                }
            }
        }

        return ResponseEntity.ok().body(R.ok("msg all checked"))
    }

}