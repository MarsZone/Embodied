//封装和发布话题相关的接口函数
import { request } from "@/utils";

//1.获取频道列表
export function getChannelAPI() {
  return request({ 
    url: '/api/channels/list',
    method: 'GET'
  })
}

//2.发布话题
export function createTopicApi(data){
  return request({
    url: '/api/topics/publishTopic?status=published', //状态已发布？
    method: 'POST',
    data
  })
}