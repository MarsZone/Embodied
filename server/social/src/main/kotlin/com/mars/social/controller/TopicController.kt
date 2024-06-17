package com.mars.social.controller

import cn.dev33.satoken.annotation.SaCheckLogin
import cn.dev33.satoken.stp.StpUtil
import com.mars.social.controller.common.CommonFunction
import com.mars.social.dto.PageDTO
import com.mars.social.dto.PageRequest
import com.mars.social.model.mix.*
import com.mars.social.model.topic.TopicComment
import com.mars.social.model.topic.TopicComments
import com.mars.social.model.topic.*
import com.mars.social.model.user.UserDetail
import com.mars.social.model.user.UserDetails
import com.mars.social.model.user.UserFollow
import com.mars.social.model.user.UserFollowDB
import com.mars.social.utils.GlobalUtils
import com.mars.social.utils.PageCalculator
import com.mars.social.utils.R
import org.apache.tomcat.util.buf.StringUtils
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

    @Autowired
    private lateinit var userController:UserController


    @GetMapping("/list")
    fun list(@RequestParam uid:Long,@RequestParam channelKey:String = "information_plaza"): ResponseEntity<R> {
        val filteredTopics = getFilteredTopics(uid, channelKey)

        val userDetails = extractAuthorUidList(filteredTopics){ it.authorUid }
        if(userDetails!=null){
            val uidToUserDetailMap = userDetails.associateBy { it.uid }

            for (topic in filteredTopics) {
                uidToUserDetailMap[topic.authorUid]?.let { userDetail ->
                    topic.authorNickName = userDetail.nickName
                    topic.authorAvatar = userDetail.avatar
                }
            }
        }
        return ResponseEntity.ok().body(R.ok(filteredTopics))
    }
    private inline fun <reified T> extractAuthorUidList(filteredItems: List<T>, authorUidExtractor: (T) -> Long?): List<UserDetail>? {
        val authIdSet = HashSet<Long>()
        for (item in filteredItems) {
            authorUidExtractor(item)?.let { authIdSet.add(it) }
        }
        if(authIdSet.isEmpty()){
            return null
        }
        return database.from(UserDetails).select().where { UserDetails.uid inList ArrayList(authIdSet)  }.map { row -> UserDetails.createEntity(row) }
    }
    private fun getFilteredTopics(uid: Long, channelKey: String): List<Topic> {
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

        return filteredTopics
    }


    /**
     * 获取指定频道的话题
     */
    @GetMapping("/channelTopics")
    fun list(@RequestParam channelKey:String = "information_plaza"): ResponseEntity<R> {
        val actualChannelKey = channelKey.ifBlank { "information_plaza" }
        val filteredTopics = database.sequenceOf(Topics)
            .filter { it.isDelete eq "false" }
            .let { topics ->
                when (actualChannelKey) {
                    "information_plaza" -> topics
                    else -> topics.filter { it.channelKey eq channelKey }
                }
            }
            .toList()
            .reversed()
        for(topic in filteredTopics){
            val userInfo = topic.authorUid?.let { userController.getUserInfo(it.toLong()) }
            CommonFunction.setTopicUserInfo(topic,userInfo);
        }
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
            //add views history
            val topicViewHisDB = database.sequenceOf(TopicViewHisDB)
            val isLogin = StpUtil.isLogin();
            if(isLogin){
                val uid = StpUtil.getLoginId()
                val uidL =uid.toString().toLong()
                val checkHis = topicViewHisDB.find{ (it.uid eq uidL) and(it.tid eq id)}
                if(checkHis!=null){
                    checkHis.delete()
                }
                val topicViewHis = Entity.create<TopicViewHis>()
                topicViewHis.uid = uidL
                topicViewHis.tid = id
                topicViewHis.createTime = LocalDateTime.now()
                topicViewHisDB.add(topicViewHis)
            }
            val tags = database.from(TopicTagsRelation).select().where { TopicTagsRelation.topicId eq topic.id }.map { row -> TopicTagsRelation.createEntity(row) }
            var tagList = ArrayList<String>()
            var tagNameList = ArrayList<String>()
            for(tag in tags){
                tagList.add(""+tag.tagId)
                var tagName = database.from(Tags).select().where { Tags.id eq tag.tagId }.map { row -> Tags.createEntity(row) }.firstOrNull()
                if (tagName != null) {
                    tagNameList.add(tagName.tagName)
                }
            }
            topic.tags = tagList
            topic.tagsName = tagNameList
            var userinfo = topic.authorUid?.let { userController.getUserInfo(it.toLong()) }
            if (userinfo != null) {
                topic.authorNickName = userinfo.nickName.toString()
            }
            if (userinfo != null) {
                topic.authorAvatar = userinfo.avatar.toString()
            }

            return ResponseEntity.ok().body(R.ok(topic))
        }
        return ResponseEntity.ok().body(R.fail("Not found topic"))
    }

    @SaCheckLogin
    @GetMapping("/getTopicViewHisCount")
    fun getTopicViewHisCount():ResponseEntity<R>{
        val uid = StpUtil.getLoginId()
        val uidL =uid.toString().toLong()
        val count = database.sequenceOf(TopicViewHisDB).filter { it.uid eq uidL }.totalRecordsInAllPages
        return ResponseEntity.ok().body(R.ok(count))
    }

    data class TopicHisDto( var id :Long?,var uid : Long?,var tid: Long?,
                            var createTime : LocalDateTime?,var title:String?)
    @SaCheckLogin
    @GetMapping("/getTopicViewHisList")
    fun getTopicViewHisList():ResponseEntity<R>{
        val uid = StpUtil.getLoginId()
        val uidL =uid.toString().toLong()
        val topicViewHisList = database.from(TopicViewHisDB)
            .leftJoin(Topics, on = TopicViewHisDB.tid eq Topics.id)
            .select(TopicViewHisDB.id,TopicViewHisDB.tid,TopicViewHisDB.uid,TopicViewHisDB.createTime,Topics.title)
            .orderBy(TopicViewHisDB.id.desc())
            .limit(100)
            .where{ TopicViewHisDB.uid eq uidL }
            .map { row ->  TopicHisDto(id = row[TopicViewHisDB.id], uid = row[TopicViewHisDB.uid],tid = row[TopicViewHisDB.tid],
                createTime = row[TopicViewHisDB.createTime],title = row[Topics.title] )}
        return ResponseEntity.ok().body(R.ok(topicViewHisList))
    }

    @SaCheckLogin
    @PostMapping("/save")
    fun save(@RequestBody topic: Topic): ResponseEntity<R>{
        val uid = StpUtil.getLoginId()
        topic.authorUid = uid.toString().toLong()
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

    data class TopicParamsRequest(val topic: Topic, val tags: Array<String>)
    @SaCheckLogin
    @PostMapping("/publishTopic")
    fun publishTopic(@RequestBody topicParams: TopicParamsRequest): ResponseEntity<R>{
        userController.printCurToken()
        var topic:Topic =  topicParams.topic
        val uid = StpUtil.getLoginId()
        topic.authorUid = uid.toString().toLong()
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
        var tagRequest : TagRequest = TagRequest(topic.id,topicParams.tags);
        toTag(tagRequest);

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
            //return ResponseEntity.ok().body(R.ok(uid.toString()+"you don't like that"))
            return ResponseEntity.ok().body(R.ok("unlike"))
        }else{
            database.update(Topics){
                set(it.likes,it.likes+1)
                where { it.id eq tid }
            }
            topicLikes.add(tlike)
            //return ResponseEntity.ok().body(R.ok(uid.toString()+"you like that"))
            return ResponseEntity.ok().body(R.ok("like"))
        }
    }
    @SaCheckLogin
    @GetMapping("/likeComment")
    fun likeComment(@RequestParam tcId:Long):ResponseEntity<R>{
        val uid = StpUtil.getLoginId()
        val commentLikeDb = database.sequenceOf(CommentLikeDb)
        val cLike =  Entity.create<CommentLike>()
        cLike.tcId = tcId
        cLike.uid = uid.toString().toLong()
        cLike.createTime = LocalDateTime.now()
        val tCheck = commentLikeDb.find{ (it.uid eq uid.toString().toLong())  and  (it.tcId eq tcId)  }
        if(tCheck!=null){
            database.update(TopicComments){
                set(it.likes,it.likes-1)
                where { it.id eq tcId }
            }
            tCheck.delete()
            return ResponseEntity.ok().body(R.ok("unlike"))
        }else{
            database.update(TopicComments){
                set(it.likes,it.likes+1)
                where { it.id eq tcId }
            }
            commentLikeDb.add(cLike)
            return ResponseEntity.ok().body(R.ok("like"))
        }
    }

    data class TagRequest(val tid: Long, var tags: Array<String>)
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

    @SaCheckLogin
    @PostMapping("toComment")
    fun toComment(@RequestBody topicComment: TopicComment):ResponseEntity<R>{
        val topicComments = database.sequenceOf(TopicComments)
        val uid = StpUtil.getLoginId()
        topicComment.createTime = LocalDateTime.now()
        topicComment.uid = uid.toString().toLong()
        topicComments.add(topicComment)
        //add comment count
        database.update(Topics){
            set(it.comments,it.comments+1)
            where { it.id eq topicComment.tid }
        }
        return ResponseEntity.ok().body(R.ok("comment it"))
    }

    @GetMapping("loadComments")
    fun loadComments(@RequestParam tid: Long):ResponseEntity<R>{
        val topicComments = database.sequenceOf(TopicComments).filter { TopicComments.tid eq tid }.toList()
        return ResponseEntity.ok().body(R.ok(topicComments))
    }

    @SaCheckLogin
    @GetMapping("toShare")
    fun toShare(@RequestParam tid: Long,@RequestParam curUrl:String):ResponseEntity<R>{
        //1.create topicShare
        val uid = StpUtil.getLoginId().toString().toLong()
        val topicShareDB = database.sequenceOf(TopicShares)
        var topicShare = Entity.create<TopicShare>()
        topicShare.tid = tid
        topicShare.uid = uid
        //2.gen the token,and jump link to response.
        val tokenLength = 10
        val randomToken = GlobalUtils.generateRandomToken(tokenLength)
        topicShare.shareToken = randomToken
        topicShare.shareTime = LocalDateTime.now()
        topicShare.urlLink = curUrl
        topicShareDB.add(topicShare)
        //3.add count to topic
        database.update(Topics){
            set(it.shares,it.shares+1)
            where { it.id eq topicShare.tid }
        }
        return ResponseEntity.ok().body(R.ok(topicShare.shareToken))
    }

    @SaCheckLogin
    @GetMapping("addBookMark")
    fun addBookMark(@RequestParam tid: Long):ResponseEntity<R>{
        val suid = StpUtil.getLoginId().toString().toLong()
        val bookMarks = database.sequenceOf(BookMarks)
        val check = database.sequenceOf(BookMarks).filter { it.uid eq suid }.filter { it.tid eq tid }.firstOrNull()
        if(check==null){
            val bookMark = Entity.create<BookMark>()
            bookMark.uid=suid
            bookMark.tid=tid
            bookMark.createTime= LocalDateTime.now()
            bookMarks.add(bookMark)
            //update topic bookMake count
            database.update(Topics){
                set(it.bookmarks,it.bookmarks+1)
                where { it.id eq tid }
            }
            return ResponseEntity.ok().body(R.ok("topic bookMarked"))
        }
        return ResponseEntity.ok().body(R.fail("already bookMarked"))
    }

    @SaCheckLogin
    @GetMapping("removeBookMark")
    fun removeBookMark(@RequestParam tid: Long):ResponseEntity<R>{
        val suid = StpUtil.getLoginId().toString().toLong()
        val bookMarks = database.sequenceOf(BookMarks)
        val cBookMark = bookMarks.find { (it.uid eq suid.toString().toLong()) and
                (it.tid eq tid) }
        if(cBookMark!=null){
            cBookMark.delete()
            database.update(Topics){
                set(it.bookmarks,it.bookmarks - 1)
                where { it.id eq tid }
            }
            return ResponseEntity.ok().body(R.ok("bookMark removed"))
        }

        return ResponseEntity.ok().body(R.fail("bookMark not found"))
    }

    data class FileParams(val tid: String, val files: List<Int>)
    @SaCheckLogin
    @PostMapping("setTopicFiles")
    fun setTopicFiles(@RequestBody fileParams:FileParams):ResponseEntity<R>{
        val uid = StpUtil.getLoginId()
        val uidL = uid.toString().toLong()
        val tidL = fileParams.tid.toString().toLong()
        //check if this topic auth is current user
        val topicDetail = database.from(Topics).select().where{ Topics.authorUid eq uidL }.map { row -> Topics.createEntity(row) }.firstOrNull()
        if(topicDetail==null){
            return ResponseEntity.ok().body(R.fail("topic not found"))
        }
//        if(topicDetail.authorUid != uidL){
//            return ResponseEntity.ok().body(R.fail("you can't modify this topic."))
//        }

        val topicFiles = database.sequenceOf(TopicFiles)
        database.update(TopicFiles){
            set(it.isDelete,"true")
            set(it.updateTime, LocalDateTime.now())
            where{ (it.uid eq uidL)  and (it.tid eq tidL) }
        }
        for(file in fileParams.files){
            val temp = Entity.create<TopicFile>()
            temp.uid = uidL
            temp.tid = tidL
            temp.fid = file.toLong()
            val file = database.from(Files).select().where{ Files.id eq temp.fid }.map { row -> Files.createEntity(row) }.firstOrNull()
            if(file!=null){
                temp.fileDesc = file.originalFileName
            }
            temp.createTime = LocalDateTime.now()
            topicFiles.add(temp)
        }
        return ResponseEntity.ok().body(R.ok("files set"))
    }

    @GetMapping("getTopicFiles")
    fun getTopicFiles(@RequestParam tid:Long):ResponseEntity<R>{
        val topicFiles = database.sequenceOf(TopicFiles).filter { it.tid eq tid }.filter { it.isDelete eq "false" }.toList().reversed()
        return ResponseEntity.ok().body(R.ok(topicFiles))
    }

    data class Actions(var isLike: Boolean, val isShare: Boolean, var isBookMark: Boolean)
    @SaCheckLogin
    @GetMapping("getTopicActions")
    fun getTopicActions(@RequestParam tid:Long):ResponseEntity<R>{
        val uid = StpUtil.getLoginId()
        val uidL = uid.toString().toLong()
        var actions = Actions(false,false,false);
        val bookMark = database.sequenceOf(BookMarks).filter { it.tid eq tid }.filter{ it.uid eq uidL }.firstOrNull()
        if(bookMark!=null){
            actions.isBookMark =true
        }
        val topicLike = database.sequenceOf(TopicLikes).filter{ it.tid eq tid }.filter { it.uid eq uidL }.firstOrNull()
        if(topicLike!=null){
            actions.isLike = true
        }
        return ResponseEntity.ok().body(R.ok(actions))
    }

}