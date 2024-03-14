package com.mars.social.entity

import org.ktorm.database.Database
import org.ktorm.entity.Entity
import org.ktorm.entity.sequenceOf
import org.ktorm.schema.Table
import org.ktorm.schema.int
import org.ktorm.schema.varchar

class Demo {
//    object City : Table<Nothing>("city") {
//        val id = int("ID").primaryKey()
//        val name = varchar("Name")
//        val countryCode = varchar("CountryCode")
//        val location = varchar("District")
//        var population = int("Population")
////
////        override fun toString(): String {
////            return "City(id=$id, name=$name, countryCode=$countryCode, location=$location, population=$population)"
////        }
//    }

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