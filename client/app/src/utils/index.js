import { request } from "./request";
import { getToken, setToken, removeToken } from "./token";
import { setUserId, getUserId, removeUserId } from "./user";


//统一中转工具模块函数 --> 我们可能封装很多个request模块，统一在这个index导出
//import {request} from '@/utils'
export {
  request,
  getToken,
  setToken,
  removeToken,
  setUserId,
  getUserId,
  removeUserId
}

