package com.mars.social.dto

import java.time.ZonedDateTime

data class FileInfo(
    val fileName: String,
    val fileSize: Long,
    val contentType: String,
    val lastModified: ZonedDateTime
)