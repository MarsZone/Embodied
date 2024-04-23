package com.mars.social.oss.minio

import cn.dev33.satoken.annotation.SaCheckLogin
import cn.dev33.satoken.annotation.SaCheckRole
import com.mars.social.dto.FileInfo
import com.mars.social.model.mix.File
import com.mars.social.model.mix.Files
import com.mars.social.model.topic.TopicLike
import com.mars.social.utils.R
import io.minio.*
import io.minio.http.Method
import org.ktorm.database.Database
import org.ktorm.dsl.*
import org.ktorm.entity.Entity
import org.ktorm.entity.add
import org.ktorm.entity.sequenceOf
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.beans.factory.annotation.Value
import org.springframework.http.HttpHeaders
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*
import org.springframework.web.multipart.MultipartFile
import java.net.URLEncoder
import java.time.LocalDateTime
import java.time.format.DateTimeFormatter
import java.util.*

@RestController
@RequestMapping("/oss")
class MinioController(val minioClient: MinioClient, @Value("\${minio.bucketname}") val bucketName: String) {

    @Autowired
    protected lateinit var database: Database

//    @GetMapping("/list-buckets")
//    fun listBuckets(): List<String> {
//        return minioClient.listBuckets().map { it.name() }
//    }

    @SaCheckLogin
    @SaCheckRole("sys")
    @GetMapping("/list")
    fun listFiles(): ResponseEntity<R> {
        val objectList = minioClient.listObjects(ListObjectsArgs.builder().bucket(bucketName).maxKeys(100).build())
        var obj = objectList.map{it.get()}
        val fileNames = objectList.map { it.get().objectName() }
        return ResponseEntity.ok(R.ok(fileNames))
    }

    @GetMapping("/download")
    fun downloadFile(@RequestParam fid: Long): ResponseEntity<ByteArray> {
        val file = database.from(Files).select().where{ Files.id eq fid }.map { row -> Files.createEntity(row) }.firstOrNull()

        val fileName = file?.fileName;
        val objectResponse = minioClient.getObject(GetObjectArgs.builder().bucket(bucketName).`object`(fileName).build())
        val byteArray = objectResponse.readAllBytes()
        val headers = HttpHeaders()
        headers.add("Content-Disposition", "attachment; filename=${URLEncoder.encode(fileName, "UTF-8")}")
        return ResponseEntity(byteArray, headers, HttpStatus.OK)
    }

//    data class UploadedFile(val fileName: String, val originalFilename: String)
    @PostMapping("/upload")
    fun uploadFiles(@RequestBody files: List<MultipartFile>): ResponseEntity<R> {
        val uploadedFiles = mutableListOf<File>()

        for (file in files) {
//            val fileName = "${UUID.randomUUID()}-${file.originalFilename}"
            val uuid = UUID.randomUUID().toString().substring(0, 8)
            val dateTime = LocalDateTime.now()
            val dateTimeFormatted = dateTime.format(DateTimeFormatter.ofPattern("yyyyMMddHHmmssSSS"))
            var fileName = "$dateTimeFormatted-$uuid-${file.originalFilename}"
            val putObjectArgs = PutObjectArgs.builder()
                .bucket(bucketName)
                .`object`(fileName)
                .stream(file.inputStream, file.size, -1)
                .contentType(file.contentType)
                .build()
            val result = minioClient.putObject(putObjectArgs)
            val originalFilename = file.originalFilename

//            val uploadedFile = Entity<File>(fileName, originalFilename.toString())
            val uploadedFile = Entity.create<File>()
            uploadedFile.fileName = fileName
            uploadedFile.originalFileName = file.originalFilename.toString()
            uploadedFile.createTime = LocalDateTime.now()
            database.sequenceOf(Files).add(uploadedFile)
            uploadedFiles.add(uploadedFile)
        }
        return ResponseEntity.ok(R.ok("Files uploaded successfully",uploadedFiles))
    }

    @GetMapping("/detail")
    fun getFileInfoByFileName(@RequestParam fid: Long): ResponseEntity<R> {
        val file = database.from(Files).select().where{ Files.id eq fid }.map { row -> Files.createEntity(row) }.firstOrNull()
        return ResponseEntity.ok(file?.let { R.ok(it) })
    }

    @GetMapping("/preview")
    fun getPreviewUrl(@RequestParam fid: Long): ResponseEntity<R> {
        val file = database.from(Files).select().where{ Files.id eq fid }.map { row -> Files.createEntity(row) }.firstOrNull()
        val fileName = file?.fileName;
        val url = minioClient.getPresignedObjectUrl(
            GetPresignedObjectUrlArgs.builder()
                .method(Method.GET)
                .bucket(bucketName)
                .`object`(fileName) // 注意这里的`object`需要加上反引号，因为是Kotlin的关键字
                .expiry(36000) // 链接有效期，单位为秒
                .build()
        )
        return ResponseEntity.ok(R.ok(url))
    }

}