package com.mars.social.controller

import cn.dev33.satoken.annotation.SaCheckLogin
import cn.dev33.satoken.stp.StpUtil
import com.mars.social.dto.PageDTO
import com.mars.social.dto.PageRequest
import com.mars.social.model.mix.Message
import com.mars.social.model.mix.Messages
import com.mars.social.model.topic.Topics
import com.mars.social.model.user.UserDetails
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
    data class HistoryResult(var senderId: String, var senderNickName: String, var senderAvatar:String,
                             var status: String, var unReadCount: Int, var msgType:String, var lastMsg:String)
    @SaCheckLogin
    @GetMapping("history")
    fun history(@RequestParam size: Int):ResponseEntity<R>{
        val uid =StpUtil.getLoginId().toString().toLong()
        val historyList = database.useConnection { conn ->
            val sql = """
                SELECT DISTINCT sender_id
                FROM (
                    SELECT sender_id
                    FROM messages
                    WHERE receiver_uid = ? AND sender_id IS NOT NULL
                    ORDER BY id DESC
                    LIMIT 0,?
                ) AS subquery;
            """.trimIndent()
            conn.prepareStatement(sql).use { statement ->
                statement.setLong(1, uid)
                statement.setInt(2, size)
                statement.executeQuery().asIterable().map {
                    HistoryResult(
                        it.getString("sender_id"),
                        "",
                        "",
                        "",
                        0,
                        "",
                        ""
                    )
                }
            }
        }
        for(history in historyList){
//            var msg = database.from(Messages).select().where{ Messages.senderId eq history.senderId.toString()}.orderBy(Messages.id.desc())
//                    .limit(1).map { row -> Messages.createEntity(row) }.firstOrNull()
//            if (msg != null) {
//                history.lastMsg = msg.content.toString()
//            }
            var lastMsg = database.from(Messages).select().where{(Messages.receiverUid eq uid.toString().toLong()) and (Messages.senderId eq history.senderId)}
                    .orderBy(Messages.id.desc()).limit(1).map{ row -> Messages.createEntity(row)}.firstOrNull()
            if (lastMsg != null) {
                history.lastMsg = lastMsg.content.toString()
                history.msgType = lastMsg.msgType.toString()
                history.status = lastMsg.status.toString()
            }
            if(history.msgType == "u"){
                var userDetail = database.from(UserDetails).select().where{ UserDetails.uid eq history.senderId.toString().toLong() }
                    .limit(1).map{row -> UserDetails.createEntity(row)}.firstOrNull()
                if(userDetail!=null){
                    history.senderNickName = userDetail.nickName
                    history.senderAvatar = userDetail.avatar
                }
            }else if(history.msgType == "g"){
                history.senderNickName = "SomeGroup"
            }else if(history.msgType == "s"){
                history.senderNickName = "System"
            }
            //unread count
            if(history.status == "unCheck"){
                var unread = database.from(Messages).select().where{
                    (Messages.receiverUid eq uid.toString().toLong()) and
                        (Messages.senderId eq history.senderId) and (Messages.status eq "unCheck") }.totalRecordsInAllPages
                history.unReadCount = unread
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

    @SaCheckLogin
    @GetMapping("getUtuMsgHistoryList")
    fun getUtuMsgHistoryList(@RequestParam targetUid:Long,@RequestParam msgId:Long,@RequestParam querySize:Int):ResponseEntity<R>{
        val suid = StpUtil.getLoginId().toString().toLong()
        var messageList:List<Message>;
        if(msgId == (-1).toLong()){
            messageList = database.from(Messages).select()
                .where{ ((Messages.receiverUid eq suid) and (Messages.senderId eq targetUid.toString()))  or
                        ((Messages.receiverUid eq targetUid) and (Messages.senderId eq suid.toString()))
                }.orderBy( Messages.id.desc()).limit(querySize).map { row -> Messages.createEntity(row) }.toList();
            return ResponseEntity.ok().body(R.ok(messageList))
        }else{
            messageList = database.from(Messages).select()
                .where{ (((Messages.receiverUid eq suid) and (Messages.senderId eq targetUid.toString()))  or
                        ((Messages.receiverUid eq targetUid) and (Messages.senderId eq suid.toString())))  and
                        (Messages.id lessEq  msgId)
                }.orderBy( Messages.id.desc()).limit(querySize).map { row -> Messages.createEntity(row) }.toList();
            return ResponseEntity.ok().body(R.ok(messageList))
        }
    }

}