package com.mars.social.controller

import com.mars.social.model.mix.Channels
import com.mars.social.utils.R
import org.ktorm.database.Database
import org.ktorm.entity.sequenceOf
import org.ktorm.entity.toList
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.http.ResponseEntity
import org.springframework.stereotype.Controller
import org.springframework.web.bind.annotation.GetMapping

@Controller
class AiController {

    @Autowired
    protected lateinit var database: Database

    @GetMapping("/register")
    fun list(): ResponseEntity<R> {
        val channels = database.sequenceOf(Channels).toList()
        return ResponseEntity.ok().body(R.ok(channels))
    }
}