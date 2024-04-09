package com.mars.social.oss.minio

import com.mars.social.dto.FileInfo
import com.mars.social.utils.R
import io.minio.*
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
    @GetMapping("/list-buckets")
    fun listBuckets(): List<String> {
        return minioClient.listBuckets().map { it.name() }
    }

    @GetMapping("/list")
    fun listFiles(): ResponseEntity<R> {
        val objectList = minioClient.listObjects(ListObjectsArgs.builder().bucket(bucketName).maxKeys(100).build())
        var obj = objectList.map{it.get()}
        val fileNames = objectList.map { it.get().objectName() }
        return ResponseEntity.ok(R.ok(fileNames))
    }

    @GetMapping("/download/{fileName}")
    fun downloadFile(@PathVariable fileName: String): ResponseEntity<ByteArray> {
        val objectResponse = minioClient.getObject(GetObjectArgs.builder().bucket(bucketName).`object`(fileName).build())
        val byteArray = objectResponse.readAllBytes()
        val headers = HttpHeaders()
        headers.add("Content-Disposition", "attachment; filename=${URLEncoder.encode(fileName, "UTF-8")}")
        return ResponseEntity(byteArray, headers, HttpStatus.OK)
    }

    data class UploadedFile(val fileName: String, val originalFilename: String)
    @PostMapping("/upload")
    fun uploadFiles(@RequestBody files: List<MultipartFile>): ResponseEntity<R> {
        val uploadedFiles = mutableListOf<UploadedFile>()

        for (file in files) {
//            val fileName = "${UUID.randomUUID()}-${file.originalFilename}"
            val uuid = UUID.randomUUID().toString().substring(0, 8)
            val dateTime = LocalDateTime.now()
            val dateTimeFormatted = dateTime.format(DateTimeFormatter.ofPattern("yyyyMMddHHmmssSSS"))
            val fileName = "$dateTimeFormatted-$uuid-${file.originalFilename}"
            val putObjectArgs = PutObjectArgs.builder()
                .bucket(bucketName)
                .`object`(fileName)
                .stream(file.inputStream, file.size, -1)
                .contentType(file.contentType)
                .build()
            val result = minioClient.putObject(putObjectArgs)
            val originalFilename = file.originalFilename

            val uploadedFile = UploadedFile(fileName, originalFilename.toString())
            uploadedFiles.add(uploadedFile)
        }
        return ResponseEntity.ok(R.ok("Files uploaded successfully",uploadedFiles))
    }

    @GetMapping("/detail")
    fun getFileInfoByFileName(@RequestParam fileName: String): ResponseEntity<R> {
        val listObjectsArgs = ListObjectsArgs.builder()
            .bucket(bucketName)
            .build()

        val objectList = minioClient.listObjects(listObjectsArgs)
        val fileInfoList = mutableListOf<FileInfo>()

        for (objectInfo in objectList) {
            val objectName = objectInfo.get().objectName()
            if (objectName == fileName) {
                val metaData = minioClient.statObject(StatObjectArgs.builder().bucket(bucketName).`object`(objectName).build())
                val fileInfo = FileInfo(objectName, metaData.size(), metaData.contentType(), metaData.lastModified())
                fileInfoList.add(fileInfo)
            }
        }

        return if (fileInfoList.isNotEmpty()) {
            ResponseEntity.ok(R.ok("File information found for fileName: $fileName", fileInfoList))
        } else {
            ResponseEntity.notFound().build()
        }
    }
}