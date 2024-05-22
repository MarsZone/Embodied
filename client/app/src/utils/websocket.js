import React, { useEffect, useState } from 'react';

const useWebSocket = (url) => {
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const newSocket = new WebSocket(url);

    newSocket.onopen = () => {
      console.log('WebSocket connected');
    };

    newSocket.onmessage = (event) => {
      console.log('Message received:', event.data);
      // 在这里处理接收到的消息
    };

    newSocket.onclose = () => {
      console.log('WebSocket disconnected');
    };

    setSocket(newSocket);

    return () => {
      newSocket.close();
    };
  }, [url]);

  const sendMessage = (message) => {
    if (socket) {
      socket.send(message);
    }
  };

  return sendMessage;
};

const WebSocketComponent = (url) => {
  const sendMessage = useWebSocket(url);

  const handleClick = () => {
    sendMessage('Hello, WebSocket!');
  };

  return (
    <div>
      <button onClick={handleClick}>Send Message</button>
    </div>
  );
};

export default WebSocketComponent;