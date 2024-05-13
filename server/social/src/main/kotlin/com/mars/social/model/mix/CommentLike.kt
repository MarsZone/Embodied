package com.mars.social.model.mix

import com.mars.social.model.user.Friendships.bindTo
import com.mars.social.model.user.Friendships.primaryKey
import org.ktorm.entity.Entity
import org.ktorm.schema.Table
import org.ktorm.schema.datetime
import org.ktorm.schema.long
import java.time.LocalDateTime

interface CommentLike : Entity<CommentLike> {
    var id:Long
    var uid:Long
    var tcId:Long
    var createTime:LocalDateTime
}


object CommentLikeDb : Table<CommentLike>("comment_like"){
    val id = long("id").primaryKey().bindTo { it.id }
    val uid = long("uid").bindTo { it.uid }
    val tcId = long("tc_id").bindTo { it.tcId }
    val createTime = datetime("create_time").bindTo { it.createTime }
}