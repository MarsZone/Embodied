package com.mars.social.configuration

import com.fasterxml.jackson.databind.Module
import org.ktorm.database.Database
import org.ktorm.jackson.KtormModule
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration
import javax.sql.DataSource

/**
 * Created by vince on May 17, 2019.
 */
@Configuration
class KtormConfiguration {
    @Autowired
    lateinit var dataSource: DataSource

    /**
     * Register the [Database] instance as a Spring bean.
     */
    @Bean
    fun database(): Database {
        return Database.connectWithSpringSupport(dataSource)
    }

    /**
     * Register Ktorm's Jackson extension to the Spring's container
     * so that we can serialize/deserialize Ktorm entities.
     */
    @Bean
    fun ktormModule(): Module {
        return KtormModule()
    }
}