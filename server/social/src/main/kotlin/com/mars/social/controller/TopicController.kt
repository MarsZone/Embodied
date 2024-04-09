package com.mars.social.controller

import cn.dev33.satoken.annotation.SaCheckLogin
import cn.dev33.satoken.stp.StpUtil
import com.mars.social.dto.PageDTO
import com.mars.social.dto.PageRequest
import com.mars.social.model.mix.Tag
import com.mars.social.model.mix.Tags
import com.mars.social.model.topic.*
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
    fun list(@RequestParam uid:Long,@RequestParam channelKey:String = "information_plaza"): ResponseEntity<R> {
        val actualChannelKey = channelKey.ifBlank { "information_plaza" }
        val filteredTopics = database.sequenceOf(Topics)
            .filter { it.authorUid eq uid }
            .filter { it.isDelete eq "false" }
            .let { topics ->
                when (actualChannelKey) {
                    "information_plaza" -> topics
                    else -> topics.filter { it.channelKey eq channelKey }
                }
            }
            .toList()
            .reversed()
        return ResponseEntity.ok().body(R.ok(filteredTopics))
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
        val topic = topics.find { it.id eq id }
        if(topic!=null){
            topic.visits += 1
            topics.update(topic)
            return ResponseEntity.ok().body(R.ok(topic))
        }
        return ResponseEntity.ok().body(R.fail("Not found topic"))
    }

    @PostMapping("/save")
    fun save(@RequestBody topic: Topic): ResponseEntity<R>{
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
    fun publishTopic(@RequestBody topic: Topic): ResponseEntity<R>{
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
        val topic = topics.find { it.id eq id }
        if (topic != null) {
            topic.isDelete = "true"
            topics.update(topic)
        }
        return ResponseEntity.ok().body(R.ok("topic is deleted"))
    }

    //like,comment,bookmark

    @SaCheckLogin
    @GetMapping("/like")
    fun like(@RequestParam tid:Long):ResponseEntity<R>{
        val uid = StpUtil.getLoginId()
        val topicLikes = database.sequenceOf(TopicLikes)
        val tlike =  Entity.create<TopicLike>()
        tlike.tid = tid
        tlike.uid = uid.toString().toLong()
        tlike.createTime = LocalDateTime.now()
        val tCheck = topicLikes.find{ (it.uid eq uid.toString().toLong())  and  (it.tid eq tid)  }
        if(tCheck!=null){
            database.update(Topics){
                set(it.likes,it.likes-1)
                where { it.id eq tid }
            }
            tCheck.delete()
            return ResponseEntity.ok().body(R.ok(uid.toString()+"you don't like that"))
        }else{
            database.update(Topics){
                set(it.likes,it.likes+1)
                where { it.id eq tid }
            }
            topicLikes.add(tlike)
            return ResponseEntity.ok().body(R.ok(uid.toString()+"you like that"))
        }
    }

    data class TagRequest(val tid: Long, val tags: Array<String>)
    @PostMapping("toTag")
    fun toTag(@RequestBody tagParams: TagRequest):ResponseEntity<R>{
        val tid = tagParams.tid
        val tags = database.sequenceOf(Tags)
//        val topicTags = database.sequenceOf(TopicTagsRelation).filter { it.topicId eq tid }.toList()    //查出这个标题所有的tag
        //标签先全删了
        database.sequenceOf(TopicTagsRelation).removeIf { it.topicId eq tid }
        tagParams.tags.forEach { value ->
            //加标签
            val tag = database.from(Tags).select().where{ Tags.tagName eq value }.map { row -> Tags.createEntity(row) }.firstOrNull()
            //看看这个标签存不存在
            var tagId = tag?.id
            if(tag==null){
                val tagItem =  Entity.create<Tag>()
                tagItem.tagName = value
                tags.add(tagItem)   //加标签
                tagId = tagItem.id
            }
            database.insert(TopicTagsRelation) {
                set(it.topicId, tid)
                set(it.tagId, tagId)
            }
        }
        return ResponseEntity.ok().body(R.ok("you tag it"))
    }

}