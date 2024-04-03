package com.mars.social.utils

import com.mars.social.dto.PageRequest

class PageCalculator {
    companion object {
        fun calculateOffset(pageRequest: PageRequest, totalRecords: Int): Int {
            val maxOffset = (totalRecords / pageRequest.pageSize).toInt() * pageRequest.pageSize
            return maxOf(0, minOf((pageRequest.pageNumber - 1) * pageRequest.pageSize, maxOffset))
        }

        fun calculateLimit(pageRequest: PageRequest, totalRecords: Int): Int {
            val maxOffset = (totalRecords / pageRequest.pageSize).toInt() * pageRequest.pageSize
            if ((pageRequest.pageNumber - 1) * pageRequest.pageSize >= maxOffset) {
                return 0
            }
            return minOf(pageRequest.pageSize, (totalRecords - (pageRequest.pageNumber - 1) * pageRequest.pageSize).toInt())
        }
    }
}
