//封装和发布话题相关的接口函数
import { request } from "@/utils";


//2.发布话题
export function createTopicApi(formData) {
  return request({
    url: '/api/topics/publishTopic', //状态已发布？
    method: 'POST',
    data: formData,
    withCredentials: true
  })
}