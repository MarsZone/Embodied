package com.mars.social.tools

import java.io.File
import java.sql.DriverManager

class AutoGenModel {
}
//fun main(args: Array<String>) {
//    val url = "jdbc:mysql://localhost:3306/embodied"
//    val username = "root"
//    val password = "123456"
//
//    Class.forName("com.mysql.cj.jdbc.Driver")
//    val connection = DriverManager.getConnection(url, username, password)
//    val metaData = connection.metaData
//
//    val tableName = "content"
//    val typeName = "content";
//    val typeTable = "contents";
//
//    val resultSet = metaData.getColumns(null, null, tableName, null)
//    val primaryKeys = metaData.getPrimaryKeys(null, null, tableName)
//
//    val columnNameMap = mutableMapOf<String, Pair<Short, String>>()
//
//    while (primaryKeys.next()) {
//        val columnName = primaryKeys.getString("COLUMN_NAME")
//        val keySeq = primaryKeys.getShort("KEY_SEQ")
//        val pkName = primaryKeys.getString("PK_NAME")
//        columnNameMap[columnName] = Pair(keySeq, pkName)
//        println("Primary Key Column Name: $columnName, Key Sequence: $keySeq, Primary Key Name: $pkName")
//    }
//    val columnInfoList = mutableListOf<ColumnInfo>()
//
//    while (resultSet.next()) {
//        val columnName = resultSet.getString("COLUMN_NAME")
//        val dataType = resultSet.getString("TYPE_NAME")
//        val isNullable = resultSet.getString("IS_NULLABLE")
//        val isAutoIncrement = resultSet.getString("IS_AUTOINCREMENT")
//        var isPrimaryKey = "NO"
//        if(columnNameMap.containsKey(columnName)){
//            isPrimaryKey = "YES"
//        }
//        val columnInfo = ColumnInfo(columnName, dataType, isNullable, isAutoIncrement, isPrimaryKey)
//        columnInfoList.add(columnInfo)
////        println("Column Name: $columnName, Data Type: $dataType, Nullable: $isNullable, Auto Increment: $isAutoIncrement , Is PrimaryKey: $isPrimaryKey")
//    }
//    for (columnInfo in columnInfoList) {
//        println("Column Name: ${columnInfo.columnName}, Data Type: ${columnInfo.dataType}, Nullable: ${columnInfo.isNullable}, Auto Increment: ${columnInfo.isAutoIncrement}, Is PrimaryKey: ${columnInfo.isPrimaryKey}")
//    }
//    resultSet.close()
//    connection.close()
//    toCodeFile(typeName,typeTable,tableName,columnInfoList)
//}
data class ColumnInfo(val columnName: String, val dataType: String, val isNullable: String, val isAutoIncrement: String, val isPrimaryKey: String)
fun toCamelCase(input: String): String {
    return input.split("_").joinToString("") { it.capitalize() }
}
fun toCodeFile(typename:String, typeTable:String, tableName:String, columnInfoList: MutableList<ColumnInfo>){
    val propertyMap = mapOf(
        "String" to "varchar",
        "Long" to "long",
        "Int" to "int",
        "INT" to "Int",
        "BIGINT" to "long",
        "MEDIUMTEXT" to "String",
        "date" to "LocalDate",
        "DATETIME" to "LocalDateTime",
    )

    val properties = columnInfoList.joinToString("\n") { columnInfo ->
        val propName = toCamelCase(columnInfo.columnName).decapitalize()
        val propType = propertyMap[columnInfo.dataType] ?: "String?"
        "\tvar $propName: $propType"
    }

    val code = """
package com.mars.social.model

import org.ktorm.entity.Entity
import org.ktorm.schema.*
import java.time.*

interface $typename : Entity<$typename> {
    $properties
}

object $typeTable : Table<$typename>("$tableName") {
    ${columnInfoList.joinToString("\n") { columnInfo ->
        val propName = toCamelCase(columnInfo.columnName).decapitalize()
        val dataType = if (columnInfo.dataType.toLowerCase() == "bigint") "long" else columnInfo.dataType.toLowerCase()
        "\tval $propName = ${dataType}(\"${columnInfo.columnName}\").bindTo { it.$propName }"
    }}
}
    """.trimIndent()

    val fileName = "$typename.kt"
//    val resourcesDir = File("src/main/resources")
    val srcDir = File("src/main/kotlin/com/mars/social/model")
    val filePath = File(srcDir, fileName)
    filePath.writeText(code)

    println("File saved successfully at: $filePath")
}