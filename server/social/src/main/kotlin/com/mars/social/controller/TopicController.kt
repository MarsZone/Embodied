package com.mars.social.controller

import com.mars.social.model.Topic
import com.mars.social.model.Topics
import com.mars.social.utils.R
import org.ktorm.database.Database
import org.ktorm.dsl.and
import org.ktorm.dsl.eq
import org.ktorm.entity.*
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*
import java.time.LocalDateTime

@CrossOrigin
@RestController
@RequestMapping("/api/topics")
class TopicController {
    @Autowired
    protected lateinit var database: Database

    @GetMapping("/list")
    fun list(@RequestParam uid:Long): ResponseEntity<R> {
        val topics = database.sequenceOf(Topics).filter { it.authorUid eq uid}.filter { it.isDelete eq "false" }.toList()
        return ResponseEntity.ok().body(R.ok(topics))
    }

    @PostMapping("/save")
    fun save(@RequestBody topic:Topic): ResponseEntity<R>{
        if(topic.authorUid == null){
            return ResponseEntity.ok().body(R.fail("Uid params needed"))
        }
        val topics = database.sequenceOf(Topics)
        topic.updateTime = LocalDateTime.now()
        if(topic.id == 0L){
            topic.createTime = LocalDateTime.now()
            topics.add(topic)
        }else{
            topics.update(topic)
        }
        return ResponseEntity.ok().body(R.ok("draft saved"))
    }

    @PostMapping("/publishTopic")
    fun publishTopic(@RequestBody topic:Topic): ResponseEntity<R>{
        if(topic.authorUid == null){
            return ResponseEntity.ok().body(R.fail("Uid params needed"))
        }
        val topics = database.sequenceOf(Topics)
        val check = topics.find {it.id eq topic.id}
        topic.status="released"
        topic.updateTime = LocalDateTime.now()
        topic.publishTime = LocalDateTime.now()
        if(check == null){
            topic.createTime = LocalDateTime.now()
            topics.add(topic)
        }else{
            topic.id = check.id
            topics.update(topic)
        }
        return ResponseEntity.ok().body(R.ok("topic published"))
    }

    @GetMapping("/delete")
    fun delete(@RequestParam id:Long): ResponseEntity<R>{
        val topics = database.sequenceOf(Topics)
        var topic = topics.find { it.id eq id }
        if (topic != null) {
            topic.isDelete = "true"
            topics.update(topic)
        }
        return ResponseEntity.ok().body(R.ok("topic is deleted"))
    }



}