//用户相关的所有请求
import { request } from "@/utils";
import { getUserId as _getUserId } from '@/utils'

//1.用户登录
export function loginAPI(formData) {
  //以下写法是axios的通用写法，任何一个请求都可以这样写
  return request({ //return返回的结果是一个promise 调用这个函数可以用async await接收返回值
    url: '/api/users/login',
    method: 'POST',
    data: formData,
    withCredentials: true
  })
}

//2.用户注册
export function registerAPI(formData) {
  return request({
    url: '/api/users/register',
    method: 'POST',
    data: formData,
  })
}

//3.获取用户详细信息
export function getProfileAPI(uid) {
  return request({
    url: '/api/users/userDetail',
    method: 'GET',
    params: { uid: 1 },
  })
}

//4.查看用户统计信息
export function getUserExtendsAPI(uid) {
  return request({
    url: '/api/users/userExtendsInfo',
    method: 'GET',
    params: { uid: uid },
  })
}


//关注
//--1.关注用户
export function followAPI(targetUid) {
  return request({
    url: '/api/users/follow',
    method: 'GET',
    params: { targetUid: targetUid },
    // withCredentials: true
  })
}

//--2.取消关注
export function unFollowAPI(targetUid) {
  return request({
    url: '/api/users/unFollow',
    method: 'GET',
    params: { targetUid: targetUid },
  })
}

//--3.查看是否关注
export function checkFollowAPI(targetUid) {
  return request({
    url: '/api/users/checkFollow',
    method: 'GET',
    params: { targetUid: targetUid },
  })
}


//好友
//--1.添加好友
export function applyToFriendAPI(targetUid) {
  return request({
    url: '/api/users/applyToFriend',
    method: 'GET',
    params: { targetUser: targetUid },
  })
}

//--2.同意用户好友申请
export function approveApplyAPI(applyId) {
  return request({
    url: '/api/users/approveApply',
    method: 'GET',
    params: { applyId: applyId },
  })
}

//--3.查询好友申请
export function getMyApplyListAPI() {
  return request({
    url: '/api/users/getMyApplyList',
    method: 'GET',
  })
}

//--4.查询好友列表
export function getMyFriendsAPI() {
  return request({
    url: '/api/users/getMyFriends',
    method: 'GET',
  })
}

//--5.查看是否好友
export function checkFriendAPI(targetUid) {
  return request({
    url: '/api/users/checkIsFriendByUid',
    method: 'GET',
    params: { targetUser: targetUid },
  })
}

//--6.用昵称模糊查询姓名
export function searchUserByNickNameApi(nickName) {
  return request({
    url: '/api/users/searchUserByNickName',
    method: 'GET',
    params: { nickName: nickName },
  })
}
