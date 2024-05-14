//消息相关的接口
import { request } from "@/utils";

//1.发送
export function sendMsgApi(data) {
  return request({
    url: '/api/msg/send',
    method: 'POST',
    data: { data }
  })
}

//2.查询消息历史记录
export function getMsgHistoryApi(size = 10) { //默认查询多少个
  return request({
    url: '/api/msg/history',
    method: 'GET',
    params: { size: size }
  })
}

//3.阅知消息
export function checkSenderMsgApi(suid) {
  return request({
    url: '/api/msg/checkSenderMsg',
    method: 'GET',
    params: { suid }
  })
}


