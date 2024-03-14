package com.mars.social

import org.springframework.boot.autoconfigure.SpringBootApplication
import org.springframework.boot.autoconfigure.jdbc.DataSourceAutoConfiguration
import org.springframework.boot.runApplication

@SpringBootApplication(exclude = [DataSourceAutoConfiguration::class])
class SocialApplication

fun main(args: Array<String>) {
	runApplication<SocialApplication>(*args)
}
