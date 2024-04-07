package com.mars.social.model.mix

import org.ktorm.entity.Entity
import org.ktorm.schema.*

interface Channel : Entity<Channel> {
	var id: Int
	var key: String
	var name: String
	var desc: String
	var lang: String
}

object Channels : Table<Channel>("channel") {
	val id = int("id").primaryKey().bindTo { it.id }
	val key = varchar("key").bindTo { it.key }
	val name = varchar("name").bindTo { it.name }
	val desc = varchar("desc").bindTo { it.desc }
	val lang = varchar("lang").bindTo { it.lang }
}