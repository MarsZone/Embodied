package com.mars.social.security;

import cn.dev33.satoken.stp.StpInterface
import com.mars.social.model.UserRoles
import com.mars.social.model.Users
import org.ktorm.database.Database
import org.ktorm.dsl.eq
import org.ktorm.entity.filter
import org.ktorm.entity.find
import org.ktorm.entity.sequenceOf
import org.ktorm.entity.toList
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.stereotype.Component

/**
 * 自定义权限加载接口实现类
 */
// 保证此类被 SpringBoot 扫描，完成 Sa-Token 的自定义权限验证扩展
@Component
class StpInterfaceImpl : StpInterface {
    @Autowired
    protected lateinit var database: Database

    /**
     * 返回一个账号所拥有的权限码集合
     */
    override fun getPermissionList(loginId: Any, loginType: String): kotlin.collections.List<String> {
        // 本 list 仅做模拟，实际项目中要根据具体业务逻辑来查询权限
        val list: MutableList<String> = ArrayList()
        list.add("user.*")
        return list
    }

    /**
     * 返回一个账号所拥有的角色标识集合 (权限与角色可分开校验)
     */
    override fun getRoleList(loginId: Any, loginType: String): kotlin.collections.List<String> {
        val list: MutableList<String> = ArrayList()
        val uid:Long = convertAnyToLong(loginId)
        val userRoles = database.sequenceOf(UserRoles).filter { it.uid eq uid}.toList()
        for(role in userRoles){
            list.add(role.role)
        }
        return list
    }
    fun convertAnyToLong(value: Any): Long {
        return when (value) {
            is Long -> value // 如果是 Long 类型直接返回
            is Int -> value.toLong() // 如果是 Int 类型转换为 Long
            is Double -> value.toLong() // 如果是 Double 类型转换为 Long
            is String -> value.toLong() // 如果是 String 类型尝试转换为 Long
            else -> 0 // 其他类型返回 null 或者可以根据具体需求进行处理
        }
    }
}