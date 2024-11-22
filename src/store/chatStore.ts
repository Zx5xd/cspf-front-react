import {create} from "zustand/react";
import {SaveChatType} from "@/hooks/ChatHook.ts";
import {io, Socket} from "socket.io-client";
import {Chat, User} from "@/types";

interface ChatRoom {
  userProfile: User | null;
  setUserProfile: (user:User) => void;
  id: string | null;
  setID: (roomID:string)=>void;
  socket: Socket | null;
  setSocket: (socket: Socket) => void;
}

interface ChatLogState {
  chatMessages:Chat[];
  cacheMessages:Map<string,Chat[]>,
  addMessage:(message:Chat) => void;
  oldMsgRemove:()=>void;
  clear:(currentId:string)=>void;
}

export const useChatRoomStore = create<ChatRoom>((setState, getState, store) => ({
  userProfile: null,
  setUserProfile:(user:User) => setState({userProfile:user}),
  id: null,
  setID: (roomID) => setState({id:roomID}),
  socket: null,
  setSocket: (socket) => setState({ socket }),
}));

// Socket.IO 인스턴스를 초기화하고 저장하는 함수입니다.
// 이 함수는 Socket.IO 인스턴스를 생성하고 Zustand 스토어에 저장하기 위해 사용됩니다.
// 주로 컴포넌트에서 Socket.IO 연결을 설정할 때 호출됩니다.
export const initializeSocket = (id: string): void => {
  const prevId = useChatRoomStore.getState().id;
  if (prevId) {
    useChatLogStore.getState().clear(prevId);
  }

  const existingSocket = useChatRoomStore.getState().socket;

  // 기존 소켓이 존재하면 연결 해제
  if (existingSocket) {
    if (existingSocket.connected) {
      console.log("Disconnecting existing socket before initializing a new one.");
      existingSocket.disconnect();
    } else if (existingSocket.disconnected) {
      console.log("Existing socket is already disconnected.");
    }
  }

  // 새 소켓 생성 및 연결
  const socket = io(import.meta.env.VITE_BE_URL, {
    query: {
      roomId: id,
    },
    withCredentials: true,
  });

  useChatRoomStore.getState().setID(id);

  // 연결 이벤트를 설정해 로그 추가
  socket.on('connect', () => {
    console.log(`Socket connected with id: ${socket.id}`);
  });

  socket.on('disconnect', () => {
    console.log("Socket disconnected.");
  });

  socket.on('connect_error', (error) => {
    console.error("Socket connection error:", error);
  });

  useChatRoomStore.getState().setSocket(socket);
};

// Socket.IO 연결을 해제하는 함수입니다.
export const disconnectSocket = (): void => {
  const existingSocket = useChatRoomStore.getState().socket;
  if (existingSocket) {
    existingSocket.disconnect();
    useChatRoomStore.getState().setSocket(null);
  }
};

export const useChatLogStore = create<ChatLogState>((setState, getState, store)=> ({
  chatMessages:[],
  cacheMessages:new Map(),
  addMessage:(msg:Chat) => setState((state)=>{
    const updatedMessages = [...state.chatMessages, msg];

    if (updatedMessages.length >= 100) {
      updatedMessages.shift()
    }

    // console.log(addMsg)
    return {
      chatMessages: updatedMessages,
    };
  }),
  oldMsgRemove: () => setState((state) => {
    const updatedMessages = state.chatMessages.slice(1); // 첫 번째 요소를 제외한 새 배열 생성
    return {
      chatMessages: updatedMessages, // 배열로 반환
    };
  }),
  clear:(currentId)=>setState((state)=>{
    const updatedMap = new Map(state.cacheMessages); // 기존 Map 복사

    if (updatedMap.size > 3) {
      const firstKey = updatedMap.keys().next().value; // 삽입된 첫 번째 키 가져오기
      updatedMap.delete(firstKey); // 첫 번째 키 삭제
    }

    updatedMap.set(currentId, state.chatMessages);

    return {
      chatMessages:[]
    }
  })
}))