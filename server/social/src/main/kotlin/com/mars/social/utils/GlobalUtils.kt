package com.mars.social.utils

import java.math.BigInteger
import java.security.SecureRandom

object GlobalUtils {
    fun generateRandomToken(length: Int): String {
        val secureRandom = SecureRandom()
        val token = BigInteger(130, secureRandom).toString(32)
        return token.take(length)
    }
}