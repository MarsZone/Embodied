package com.mars.social

import cn.dev33.satoken.SaManager
import com.ulisesbocchio.jasyptspringboot.annotation.EnableEncryptableProperties
import org.springframework.boot.autoconfigure.SpringBootApplication
import org.springframework.boot.runApplication
import org.springframework.boot.web.embedded.tomcat.TomcatServletWebServerFactory
import org.springframework.context.annotation.Bean


@SpringBootApplication()
@EnableEncryptableProperties
class SocialApplication

fun main(args: Array<String>) {
	runApplication<SocialApplication>(*args)
	println("启动成功，Sa-Token 配置如下：" + SaManager.getConfig())
}

