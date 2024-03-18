package com.mars.social.entity

import org.ktorm.database.Database
import org.ktorm.entity.Entity
import org.ktorm.entity.sequenceOf
import org.ktorm.schema.Table
import org.ktorm.schema.int
import org.ktorm.schema.varchar

class Demo {
    interface City : Entity<City> {
        val id: Int?
        var name: String
        var countryCode: String
        var location: String
        var population: Int
    }

    object Cities : Table<City>("city") {
        val id = int("id").primaryKey().bindTo { it.id }
        val name = varchar("name").bindTo { it.name }
        val countryCode = varchar("countryCode").bindTo { it.countryCode }
        val population = int("population").bindTo { it.population }
    }

}