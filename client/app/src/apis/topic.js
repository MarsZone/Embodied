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

//5.发表评论_登录校验
export function postCommentApi(form) {
  return request({
    url: '/api/topics/toComment',
    method: 'POST',
    data: form
  })
}

//6.点赞_登录校验
export function likeApi(topicId) {
  return request({
    url: '/api/topics/like',
    method: 'GET',
    params: { tid: topicId }
  })
}

//7.添加收藏
export function addBookmarkApi(topicId) {
  return request({
    url: '/api/topics/addBookMark',
    method: 'GET',
    params: { tid: topicId }
  })
}

//8.取消收藏
export function removeBookmarkApi(topicId) {
  return request({
    url: '/api/topics/removeBookMark',
    method: 'GET',
    params: { tid: topicId }
  })
}

//9.获取话题初始状态
export function getTopicActionApi(topicId) {
  return request({
    url: '/api/topics/getTopicActions',
    method: 'GET',
    params: { tid: topicId }
  })
}