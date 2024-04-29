package com.mars.social.model.user

import com.mars.social.model.user.Friendships.bindTo
import com.mars.social.model.user.Friendships.primaryKey
import org.ktorm.entity.Entity
import org.ktorm.schema.Table
import org.ktorm.schema.datetime
import org.ktorm.schema.long
import org.ktorm.schema.varchar
import java.time.LocalDateTime

interface UserFollow : Entity<UserFollow> {
    var id: Long
    var followerUid:Long
    var followedUid:Long
    var createTime: LocalDateTime
}

object UserFollowDB : Table<UserFollow>("user_follow") {
    val id = long("id").primaryKey().bindTo { it.id }
    val followerUid = long("follower_uid").primaryKey().bindTo { it.followerUid }
    val followedUid = long("followed_uid").primaryKey().bindTo { it.followedUid }
    val createTime = datetime("create_time").bindTo { it.createTime }
}