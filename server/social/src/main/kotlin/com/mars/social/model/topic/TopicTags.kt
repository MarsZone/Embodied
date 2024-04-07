package com.mars.social.model.topic

import org.ktorm.entity.Entity
import org.ktorm.schema.Table
import org.ktorm.schema.long

interface TopicTags : Entity<TopicTags> {
    var topicId: Long
    var tagId: Long
}

object TopicTagsRelation : Table<TopicTags>("topic_tags") {
    val topicId = long("topic_id").bindTo { it.topicId }
    val tagId = long("tag_id").bindTo { it.tagId }
}