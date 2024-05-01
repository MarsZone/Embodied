// 话题相关的接口
import { request } from "@/utils";


//1.获取频道列表
export function getChannelAPI() {
  return request({ 
    url: '/api/channels/list',
    method: 'GET'
  })
}

//2.获取话题列表（传参uid channelKey，只能查看当前用户的指定频道话题?）
export function getChannelTopics(channelKey){
  return request({
    url: '/api/topics/list',
    method: 'GET',
    params: { channelKey: channelKey }
  })
}