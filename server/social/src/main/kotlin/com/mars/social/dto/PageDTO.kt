package com.mars.social.dto

data class PageDTO<T>(
    val modelList: List<T>,
    val totalRecordsInAllPages: Int,
    val startIndex: Int,
    val pageSize: Int,
    val pageCount: Int
) {
    constructor(modelList: List<T>, totalRecordsInAllPages: Int, pageRequest: PageRequest)
            : this(
        modelList,
        totalRecordsInAllPages,
        (pageRequest.pageNumber - 1) * pageRequest.pageSize,
        pageRequest.pageSize,
        if (totalRecordsInAllPages % pageRequest.pageSize == 0) {
            totalRecordsInAllPages / pageRequest.pageSize
        } else {
            totalRecordsInAllPages / pageRequest.pageSize + 1
        }
    )
}