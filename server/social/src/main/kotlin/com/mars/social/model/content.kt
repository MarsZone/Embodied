package com.mars.social.model

import org.ktorm.entity.Entity
import org.ktorm.schema.*
import java.time.*

interface content : Entity<content> {
    
}

object contents : Table<content>("content") {
    
}