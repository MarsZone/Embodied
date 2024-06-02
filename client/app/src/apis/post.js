//封装和发布话题相关的接口函数
import { request } from "@/utils";

//1.发布话题
export function createTopicApi(formData) {
  return request({
    url: '/api/topics/publishTopic',
    method: 'POST',
    data: formData,
    withCredentials: true
  })
}

//2.存草稿
export function saveTopicDraftApi(formData) {
  return request({
    url: '/api/topics/save',
    method: 'POST',
    data: formData,
    withCredentials: true
  })
}