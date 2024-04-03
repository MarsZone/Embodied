package com.mars.social.controller

import com.mars.social.dto.PageDTO
import com.mars.social.dto.PageRequest
import com.mars.social.model.Topic
import com.mars.social.model.Topics
import com.mars.social.utils.PageCalculator
import com.mars.social.utils.R
import org.ktorm.database.Database
import org.ktorm.dsl.*
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

    @PostMapping("page")
    fun page(@RequestBody pageRequest: PageRequest,@RequestParam uid:Long):ResponseEntity<R>{
        val totalRecords = database.sequenceOf(Topics).filter { it.authorUid eq uid}.filter { it.isDelete eq "false" }.totalRecordsInAllPages;
        val offset = PageCalculator.calculateOffset(pageRequest, totalRecords)
        val limit = PageCalculator.calculateLimit(pageRequest, totalRecords)

        val query = database.from(Topics).select()
                    .where{ (Topics.authorUid eq uid) and (Topics.isDelete eq "false") }
                    .limit(offset, limit)
            .map { row -> Topics.createEntity(row) }
        query.forEach{ println(it) }

        val page = PageDTO(query.toList(),totalRecords,pageRequest)
        return ResponseEntity.ok().body(R.ok(page))
    }

    @GetMapping("/show")
    fun show(@RequestParam id:Long): ResponseEntity<R>{
        val topics = database.sequenceOf(Topics)
        var topic = topics.find { it.id eq id }
        if(topic!=null){
            topic.visits += 1
            topics.update(topic)
            return ResponseEntity.ok().body(R.ok(topic))
        }
        return ResponseEntity.ok().body(R.fail("Not found topic"))
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