package com.mars.social.controller

import com.mars.social.model.mix.Channels
import com.mars.social.utils.R
import org.ktorm.database.Database
import org.ktorm.dsl.*
import org.ktorm.entity.*
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*

@CrossOrigin
@RestController
@RequestMapping("/api/channels")
class ChannelsController {
    @Autowired
    protected lateinit var database: Database

    @GetMapping("/list")
    fun list(): ResponseEntity<R> {
        val channels = database.sequenceOf(Channels).toList()
        return ResponseEntity.ok().body(R.ok(channels))
    }
}