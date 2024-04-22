package com.mars.social

import cn.dev33.satoken.SaManager
import com.alibaba.druid.spring.boot3.autoconfigure.DruidDataSourceAutoConfigure
import com.ulisesbocchio.jasyptspringboot.annotation.EnableEncryptableProperties
import org.springframework.boot.autoconfigure.EnableAutoConfiguration
import org.springframework.boot.autoconfigure.SpringBootApplication
import org.springframework.boot.runApplication

@SpringBootApplication()
@EnableEncryptableProperties
class SocialApplication

fun main(args: Array<String>) {
	runApplication<SocialApplication>(*args)
	println("启动成功，Sa-Token 配置如下：" + SaManager.getConfig())
}
