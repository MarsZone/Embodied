package com.mars.social.controller

import com.mars.social.model.Demo
import org.jasypt.encryption.StringEncryptor
import org.ktorm.database.Database
import org.ktorm.dsl.from
import org.ktorm.dsl.limit
import org.ktorm.dsl.map
import org.ktorm.dsl.select
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RestController


@RestController
class DemoController {
    @Autowired
    lateinit var apiCall:ApiCall

    @GetMapping("/")
    fun index() = "Hello, mars!"

    @GetMapping("/callAiApi")
    fun callAiApi(){
        apiCall.call();
    }

    @GetMapping("/toDB")
    fun getDB(){
        val database = Database.connect(
            url = "jdbc:mysql://localhost:3306/world",
            driver = "com.mysql.cj.jdbc.Driver",
            user = "root",
            password = "123456"
        )
        //var cities = database.sequenceOf(Demo.Cities);

        var cities = database.from(Demo.Cities).select().limit(5).map { row -> Demo.Cities.createEntity(row) }
        for(city in cities){
            println(city.name);
        }
//        for (row in database.from(Demo.City).select()) {
//            println(row)
//            println(row[Demo.City.name]);
//        }
//        val query  = database.from(Demo.City).select()
//        println(query.)
    }
}