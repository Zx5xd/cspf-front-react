export interface ChatRoom {
    chatRoomID: string,
    chatMembersCode: JSON | null,
    chatRoom: Text | null,
    creationTime: string,
    accessUser: JSON,
}

export interface ChatLogFilter {
    roomId?: string,
    page: number,
    limit: number;
}

export interface ChatLog {
    chatLogID: string;
    chatRoomID: string,
    user?: JSON;
    expert?: JSON;
    chatMessage?: string;
    chatImageUrl?: string;
    createdAt: string;
    type: 'USER' | 'EXPERT';
}

export interface MessageProp {
    message?: string
    src?: string;
    sender: string;
    direction?: "incoming" | "outgoing"; // 'incoming'은 받는 메시지, 'outgoing'은 보낸 메시지
}

export interface MessageCompaintProp{
    id?: number;
    declarer:string;
    perpetrator:string;
    chatRoomId: string;
    chatMessage: string;
    description?: string;
    createdAt?: string;
}