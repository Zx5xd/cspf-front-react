import React, {useEffect, useRef, useState} from 'react';
import { Button, Table, ListGroup, Col, Row, Modal } from 'react-bootstrap';
import {fetchData, fetchUrl} from "../../util/fetchData.ts";
import axios from "axios";
import {convertToKoreanTime} from "../../util/convertDate.ts";
import {axiosGet} from "../../util/axiosData.ts";
import {
  ChatContainer,
  ConversationHeader,
  MainContainer, MessageInput,
  MessageList,
  VoiceCallButton
} from "@chatscope/chat-ui-kit-react";
import MsgListComponent from "../../components/chat/MsgListComponent.tsx";
import {MessageProp} from "../../components/chat/chatInterface.ts";
import {ChatRoom, ChatLog, ChatLogFilter} from "../../components/chat/chatInterface.ts";
import {migHost} from "../../util/apiInof.ts";

export const ChatManage: React.FC = () => {
  const [chats, setChats] = useState<ChatRoom[]>([]);
  const [chatLogs, setChatLogs] = useState<any[]>([]);

  const [selectedChat, setSelectedChat] = useState<ChatRoom | null>(null);
  const [roomLogs, setRoomLogs] = useState<ChatLog[]>([]);
  const [messages, setMessages] = useState<MessageProp[]>([]);

  const [hide, setHide] = useState(false);
  const [logFilter, setLogFilter] = useState<ChatLogFilter | null>(null);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState<number>(20);

  const modalBodyRef = useRef<HTMLDivElement | null>(null);
  const [isBottom, setIsBottom] = useState(false);

  const host = migHost()
      //import.meta.env.VITE_DEV_CSPF_HOST;

  // 컴포넌트가 처음 마운트될 때 유저 데이터를 가져옴
  useEffect(() => {
    console.log('isBottom, ',isBottom)
    setLogFilter({
      page: page,
      limit: limit*page,
    });

    axiosGet(`${host}chatRoom`).then((data) => {
      setChats(data?.data);
    });
    axiosGet(`${host}chatLog`).then((data) => {
      setChatLogs(data?.data.results);
    });

    setPage(page+1)

  }, [isBottom]);

  const handleGetInfo = (chat: ChatRoom) => {
    if(hide){
      setSelectedChat(null)
    } else{
      setSelectedChat(chat)
      setRoomLogs([])
      console.log(chatLogs)

      if(chatLogs && chatLogs.length > 0){
        setRoomLogs(chatLogs.filter(log => log.chatRoomID === chat.chatRoomID))
      }
    }
    setHide(!hide);
  }

  const handleScroll = () => {
    if (modalBodyRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = modalBodyRef.current;
      // 특정 위치 또는 맨 아래 도달 여부 확인
      setIsBottom(scrollTop + clientHeight >= scrollHeight - 10); // 여유 공간을 두기 위해 -10
    }
  };


  useEffect(() => {
    if (roomLogs.length > 0) {
      setMessages([])
      console.log('roomLogs',roomLogs)
      setMessages(roomLogs.map((chat) => ({
        message: chat.chatMessage,
        sender: chat.user.userCode,
        direction: (selectedChat?.accessUser.owner === chat.user.userCode) ? "outgoing" : "incoming",
      })))
    }
  }, [roomLogs]);

  useEffect(() => {
    const modalBody = modalBodyRef.current;
    if (modalBody) {
      modalBody.addEventListener("scroll", handleScroll);
      console.log('modalBody.addEvent 작동')
    }
    return () => {
      if (modalBody) {
        modalBody.removeEventListener("scroll", handleScroll);
        console.log('modalBody.addEvent 제거')
      }
    };
  }, []);


  return (
      <div>
      <Row>
        <Col md={12}>
          <Table striped bordered hover className="mt-3">
            <thead>
            <tr>
              <th>roomID</th>
              <th>chatRoom</th>
              <th>참가인원</th>
              <th>방장</th>
              <th>생성일자</th>
            </tr>
            </thead>
            <tbody>
            {chats?.map((chat) => (
                <tr key={chat.chatRoomID}>
                  <td>{chat.chatRoomID}</td>
                  <td>{chat.chatRoom}</td>
                  <td>{chat.accessUser.access}</td>
                  <td>{chat.accessUser.owner}</td>
                  <td className={'text-wrap;'} style={{ width: '7rem' }}>
                    {convertToKoreanTime(chat.creationTime)}
                  </td>
                  <td>
                    <Button variant="info" onClick={() => handleGetInfo(chat)} className="me-2">
                      조회
                    </Button>
                  </td>
                </tr>
            ))}
            </tbody>
          </Table>
        </Col>
      </Row>
        <Modal show={hide} onHide={() => setHide(false)} size="lg" centered>
              <Modal.Header closeButton>
                <Modal.Title>{selectedChat?.accessUser.owner}</Modal.Title>
              </Modal.Header>
              <Modal.Body ref={modalBodyRef} style={{ overflowY: 'auto', height: '600px' }}>
                <MainContainer>
                  <ChatContainer>
                    <MessageList>
                      <MsgListComponent messages={messages}/>
                    </MessageList>
                  </ChatContainer>
                </MainContainer>
              </Modal.Body>
        </Modal>
      </div>
  );
};
