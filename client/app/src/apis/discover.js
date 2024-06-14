//发现页相关接口

import { request } from "@/utils";

//1.随机探索发现topic
export function exploreTopicsApi(numbers = 5) {
  return request({
    url: '/api/discover/explore',
    method: 'GET',
    numbers: numbers
  })
}

//2.随机探索发现topic
export function followTopicsApi(params = { numbers: 5, offset: 0 }) {
  return request({
    url: '/api/discover/loadFollowedTargetActivities',
    method: 'GET',
    params: params
  })
}