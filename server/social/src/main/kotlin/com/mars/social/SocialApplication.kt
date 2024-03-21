package com.mars.social

import cn.dev33.satoken.SaManager
import org.springframework.boot.autoconfigure.SpringBootApplication
import org.springframework.boot.runApplication

@SpringBootApplication()
class SocialApplication

fun main(args: Array<String>) {
	runApplication<SocialApplication>(*args)
	println("启动成功，Sa-Token 配置如下：" + SaManager.getConfig())
}
