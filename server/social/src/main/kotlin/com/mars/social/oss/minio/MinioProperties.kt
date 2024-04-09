package com.mars.social.oss.minio

import org.springframework.boot.context.properties.ConfigurationProperties
import org.springframework.context.annotation.Configuration

@Configuration
@ConfigurationProperties(prefix = "minio")
class MinioProperties {
    lateinit var endpoint: String
    lateinit var accessKey: String
    lateinit var secretKey: String
}