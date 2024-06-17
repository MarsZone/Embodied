package com.mars.social.model.mix

import com.mars.social.model.user.Friendships.bindTo
import com.mars.social.model.user.Friendships.primaryKey
import org.ktorm.entity.Entity
import org.ktorm.schema.Table
import org.ktorm.schema.datetime
import org.ktorm.schema.long
import org.ktorm.schema.varchar
import java.time.LocalDateTime

interface TopicShare : Entity<TopicShare> {
    var id:Long
    var uid:Long
    var tid:Long
    var shareTime:LocalDateTime
    var shareToken:String
    var urlLink:String
}


object TopicShares : Table<TopicShare>("user_share"){
    val id = long("id").primaryKey().bindTo { it.id }
    val uid = long("uid").bindTo { it.uid }
    val tid = long("tid").bindTo { it.tid }
    val shareTime = datetime("share_time").bindTo { it.shareTime }
    val shareToken = varchar("share_token").bindTo { it.shareToken }
    val urlLink = varchar("url_link").bindTo { it.urlLink }
}