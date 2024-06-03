package com.mars.social.controller

import cn.dev33.satoken.annotation.SaCheckLogin
import cn.dev33.satoken.stp.StpUtil
import com.mars.social.model.topic.Topic
import com.mars.social.model.topic.Topics
import com.mars.social.model.user.UserFollowDB
import com.mars.social.utils.R
import org.ktorm.database.Database
import org.ktorm.dsl.*
import org.ktorm.entity.sequenceOf
import org.ktorm.entity.sortedBy
import org.ktorm.entity.toList
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.CrossOrigin
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController

@CrossOrigin
@RestController
@RequestMapping("/api/discover")
class DiscoverController {
    @Autowired
    protected lateinit var database: Database

    @Autowired
    lateinit var userController:UserController

    data class TopicPost(var userInfo: UserController.UserInfoDto?, var topic:Topic)
//    data class FollowedTargetActivities(var topicPostList:List<TopicPost>)
//    data class DiscoverDto(var randomTopics:List<Topic>)

    @GetMapping("/explore")
    fun explore(numbers:Int=3): ResponseEntity<R>{
        val randomTopics = database.sequenceOf(Topics).sortedBy { it.publishTime.desc() }.toList().shuffled().take(numbers)
        var topicPostList = ArrayList<TopicPost>()
        for(topic in randomTopics){
            var userInfo = topic.authorUid?.let { userController.getUserInfo(it) }
            var topicPost = TopicPost(userInfo,topic)
            topicPostList.add(topicPost)
        }
        return ResponseEntity.ok().body(R.ok(topicPostList))
    }

    @SaCheckLogin
    @GetMapping("/loadFollowedTargetActivities")
    fun loadFollowedTargetActivities( offset:Long = 0, numbers:Int=3): ResponseEntity<R> {
        var offsetIndex:Long = 0
        if(offset.toInt() !=0){
            offsetIndex = offset
        }else{
            var topId = database.from(Topics).select(Topics.id).orderBy(Topics.id.desc()).map { row -> Topics.createEntity(row) }.firstOrNull()
            if (topId != null) {
                offsetIndex = topId.id
            }
        }
        val uid = StpUtil.getLoginId().toString().toLong()
        val topics =database.from(Topics).innerJoin(UserFollowDB,on=Topics.authorUid eq UserFollowDB.followedUid)
            .select().where { (UserFollowDB.followerUid eq uid) and (Topics.id lessEq offsetIndex) }.orderBy(Topics.publishTime.desc()).limit(numbers)
            .map { row -> Topics.createEntity(row) }.toList()
        var topicPostList = ArrayList<TopicPost>()
        for(topic in topics){
            var userInfo = topic.authorUid?.let { userController.getUserInfo(it) }
            var topicPost = TopicPost(userInfo,topic)
            topicPostList.add(topicPost)
        }
        return ResponseEntity.ok().body(R.ok(topicPostList))
    }
}