import { useEffect, useRef, useState } from 'react';
import { io, Socket } from 'socket.io-client';
import { migHost } from '@/util/apiInof.ts';



const useWebSocket = () => {
  const [unreadCounts, setUnreadCounts] = useState({});
  const wsRef = useRef<Socket | null>(null);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  useEffect(() => {
    if(isOpen){
      wsRef.current = io(migHost(),{withCredentials:true})
      console.log('useWebSocket')
      // 모든 채팅방의 새 메시지 수신
      wsRef.current.on('newMessage', (message) => {
        const { roomId } = message;
        console.log('newMessage ', roomId);

        setUnreadCounts((prevCounts) => ({
          ...prevCounts,
          [roomId]: (prevCounts[roomId] || 0) + 1
        }));
      });
    }

    return () => {
      webSocketOff()
    };
  }, []);

  const webSocketOff = () =>{
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    wsRef.current && wsRef.current.off('newMessage');
  }

  const resetUnreadCount = (roomId) => {
    setUnreadCounts((prevCounts) => ({
      ...prevCounts,
      [roomId]: 0
    }));
  };

  return { unreadCounts, resetUnreadCount, setIsOpen };
};

export default useWebSocket;
