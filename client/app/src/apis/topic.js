// 话题相关的接口
import { request } from "@/utils";


//1.获取频道列表
export function getChannelApi() {
  return request({
    url: '/api/channels/list',
    method: 'GET'
  })
}

//2.获取指定频道的话题
export function getChannelTopicsApi(channelKey) {
  return request({
    url: '/api/topics/channelTopics',
    method: 'GET',
    params: { channelKey: channelKey }
  })
}

//3.查看单个话题
export function getIndividualTopicApi(topicId) {
  return request({
    url: '/api/topics/show',
    method: 'GET',
    params: { id: topicId }
  })
}

//4.查询话题评论
export function getCommentsApi(topicId) {
  return request({
    url: '/api/topics/loadComments',
    method: 'GET',
    params: { tid: topicId }
  })
}

//5.发表评论
export function postCommentApi(form) {
  return request({
    url: '/api/topics/toComment',
    method: 'POST',
    data: form
  })
}

