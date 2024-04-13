package com.mars.social.controller

import cn.dev33.satoken.annotation.SaCheckLogin
import cn.dev33.satoken.stp.StpUtil
import com.mars.social.model.mix.Message
import com.mars.social.model.mix.Messages
import com.mars.social.utils.R
import org.ktorm.database.Database
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
        val message:Message = Entity.create<Message>()
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

}