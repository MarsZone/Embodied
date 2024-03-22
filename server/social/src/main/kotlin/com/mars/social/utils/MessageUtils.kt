package com.mars.social.utils

import org.springframework.context.MessageSource
import org.springframework.context.i18n.LocaleContextHolder
import org.springframework.stereotype.Component

@Component
class MessageUtil(private val messageSource: MessageSource) {

    /**
     * 获取单个国际化翻译值
     */
    fun get(msgKey: String): String {
        return try {
//            val request = (RequestContextHolder.getRequestAttributes() as ServletRequestAttributes).request
//            val localeResolver = AcceptHeaderLocaleResolver()
//            val locale = localeResolver.resolveLocale(request)
//            LocaleContextHolder.setLocale(locale)
            //我可真是惊呆了，zh_CN识别不了，只能传入zh或者en，zh-CN不能下划线，必须-
            //这鬼玩意，真服了。。。必须要有个messages.properties 搞到两点，吐血。
            val local = LocaleContextHolder.getLocale()
            messageSource.getMessage(msgKey, null, local)
        } catch (e: Exception) {
            msgKey
        }
    }
}