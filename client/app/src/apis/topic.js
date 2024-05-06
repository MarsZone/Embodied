// 话题相关的接口
import { request } from "@/utils";


//1.获取频道列表
export function getChannelAPI() {
  return request({
    url: '/api/channels/list',
    method: 'GET'
  })
}

//2.获取指定频道的话题
export function getChannelTopics(channelKey) {
  return request({
    url: '/api/topics/channelTopics',
    method: 'GET',
    params: { channelKey: channelKey }
  })
}

//3.查看单个话题
export function getIndividualTopic(topicId) {
  return request({
    url: '/api/topics/show',
    method: 'GET',
    params: { id: topicId }
  })
}

