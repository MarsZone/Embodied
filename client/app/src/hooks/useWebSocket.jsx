//自定义hook：websocket连接逻辑

import { getToken as _getToken } from '@/utils';
import { useEffect, useRef } from 'react';

const useWebSocket = (onMessage) => {

  const baseUrl = 'ws://localhost:8080' //可修改
  //const baseUrl = 'ws://120.78.142.84:8080' //可修改
  const satoken = _getToken()
  const wsUrl = `${baseUrl}/ws-connect?satoken=${satoken}`

  const ws = useRef(null)

  useEffect(() => {
    //创建 WebSocket 连接的函数
    const connectWebSocket = () => {
      ws.current = new WebSocket(wsUrl)

      //连接打开事件
      ws.current.onopen = () => {
        console.log('WebSocket连接开启')
      }

      //连接关闭事件
      ws.current.onclose = () => {
        console.log('WebSocket连接关闭')
      }

      //收到消息事件
      ws.current.onmessage = (event) => {
        console.log('后端ws返回的原始数据：', event)
        //onMessage是回调函数，也就是在 Chat 组件中定义的 handleWebSocketMessage函数
        if (onMessage) {
          onMessage(event);
        }
      }
    }

    // 如果 WebSocket 实例存在且未关闭，先关闭它
    if (ws.current) {
      ws.current.close();
    }

    //建立新的 WebSocket 连接
    connectWebSocket();

    //清理函数，在组件卸载时关闭WebSocket连接
    return () => {
      if (ws.current && ws.current.readyState === WebSocket.OPEN) {
        ws.current.close();
      }
    }
  }, [])

  //返回 WebSocket 实例
  return ws.current
}

export default useWebSocket