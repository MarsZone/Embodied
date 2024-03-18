package com.mars.social.utils

import com.fasterxml.jackson.core.JsonParser
import com.fasterxml.jackson.core.JsonGenerator
import com.fasterxml.jackson.databind.JsonSerializer
import com.fasterxml.jackson.databind.SerializerProvider
import com.fasterxml.jackson.databind.DeserializationContext
import com.fasterxml.jackson.databind.JsonDeserializer
import com.fasterxml.jackson.databind.module.SimpleModule
import java.io.IOException
import java.time.LocalTime

//class LocalTimeSerializer : JsonSerializer<LocalTime>() {
//    @Throws(IOException::class)
//    override fun serialize(value: LocalTime?, gen: JsonGenerator, serializers: SerializerProvider) {
//        gen.writeString(value.toString())
//    }
//}
//
//class LocalTimeDeserializer : JsonDeserializer<LocalTime>() {
//    @Throws(IOException::class)
//    override fun deserialize(p: JsonParser, ctxt: DeserializationContext): LocalTime {
//        return LocalTime.parse(p.text)
//    }
//}