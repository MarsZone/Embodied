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
export function getChannelTopics(channelKey){
  return request({
    url: '/api/topics/channelTopics',
    method: 'GET',
    params: { channelKey: channelKey }
  })
}