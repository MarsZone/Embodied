package com.mars.social.controller

import cn.dev33.satoken.annotation.SaCheckLogin
import cn.dev33.satoken.stp.StpUtil
import com.mars.social.model.topic.*
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
    //comment action
    data class CommentAction(var userInfo: UserController.UserInfoDto?,var comment:TopicComment)
    //like action
    data class likeAction(var userInfo: UserController.UserInfoDto?,var like:TopicLike)

    data class FollowedTargetActivities(var topicPostList:List<TopicPost>,var commentActionList:List<CommentAction>,var likeActionList:List<likeAction>)
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
        val uid = StpUtil.getLoginId().toString().toLong()
        var offsetIndex:Long = 0
        if(offset.toInt() !=0){
            offsetIndex = offset
        }else{
            var topId = database.from(Topics).select(Topics.id).orderBy(Topics.id.desc()).map { row -> Topics.createEntity(row) }.firstOrNull()
            if (topId != null) {
                offsetIndex = topId.id
            }
        }
        val topics =database.from(Topics).innerJoin(UserFollowDB,on=Topics.authorUid eq UserFollowDB.followedUid)
            .select().where { (UserFollowDB.followerUid eq uid) and (Topics.id lessEq offsetIndex) }.orderBy(Topics.publishTime.desc()).limit(numbers)
            .map { row -> Topics.createEntity(row) }.toList()
        val topicPostList = ArrayList<TopicPost>()
        for(topic in topics){
            val userInfo = topic.authorUid?.let { userController.getUserInfo(it) }
            val topicPost = TopicPost(userInfo,topic)
            topicPostList.add(topicPost)
        }

        val commentActionList = ArrayList<CommentAction>()
        val topicComments = database.from(TopicComments).innerJoin(UserFollowDB,on=TopicComments.uid eq UserFollowDB.followedUid)
            .select().where{(UserFollowDB.followerUid eq uid)}.orderBy( TopicComments.createTime.desc() ).limit(numbers)
            .map{ row-> TopicComments.createEntity(row)}.toList()
        for(topicComment in topicComments){
            val userInfo = userController.getUserInfo(topicComment.uid)
            val commentAction = CommentAction(userInfo,topicComment)
            commentActionList.add(commentAction)
        }

        val likeActionList = ArrayList<likeAction>()
        val topicLikes = database.from(TopicLikes).innerJoin(UserFollowDB,on=TopicLikes.uid eq UserFollowDB.followedUid)
            .select().where{ (UserFollowDB.followerUid eq uid) }.orderBy( TopicLikes.createTime.desc() ).limit(numbers)
            .map { row -> TopicLikes.createEntity(row) }.toList()
        for(topicLike in topicLikes){
            val userInfo = userController.getUserInfo(topicLike.uid)
            val likeAction = likeAction(userInfo,topicLike)
            likeActionList.add(likeAction)
        }

        var followedTargetActivities:FollowedTargetActivities = FollowedTargetActivities(topicPostList,commentActionList,likeActionList);

        return ResponseEntity.ok().body(R.ok(followedTargetActivities))
    }
}