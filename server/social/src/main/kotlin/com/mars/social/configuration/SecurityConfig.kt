package com.mars.social.configuration

import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration
import org.springframework.security.config.Customizer
import org.springframework.security.config.annotation.web.builders.HttpSecurity
import org.springframework.security.config.annotation.web.configurers.oauth2.server.resource.OAuth2ResourceServerConfigurer
import org.springframework.security.config.http.SessionCreationPolicy
import org.springframework.security.web.SecurityFilterChain


@Configuration
class SecurityConfiguration {
//    @Bean
//    @Throws(Exception::class)
//    fun filterChain(http: HttpSecurity): SecurityFilterChain {
//        return http
//            .csrf { csrf -> csrf.disable() }
//            .authorizeHttpRequests { auth ->
//                auth
//                    .requestMatchers("/token/**").permitAll()
//                    .anyRequest().authenticated()
//            }
//            .sessionManagement { sess -> sess.sessionCreationPolicy(SessionCreationPolicy.STATELESS) }
//            .httpBasic(Customizer.withDefaults())
//            .build()
//    }
    @Bean
    fun securityFilterChain(http: HttpSecurity): SecurityFilterChain {
        http
            .authorizeRequests()
            .anyRequest().permitAll()
            .and()
            .csrf { csrf -> csrf.disable() }
        return http.build()
    }
}