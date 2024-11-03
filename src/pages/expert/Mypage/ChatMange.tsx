import {Button, Card, Col, Dropdown, Modal, Row} from "react-bootstrap";
import React, {useEffect, useState} from "react";
import {ExpertChatManage} from "../../../components/user/props/ExpertProps.ts";
import {axiosGet} from "../../../util/axiosData.ts";
import {ChatRoom} from "../../../components/chat/chatInterface.ts";
import {ChatContainer, MainContainer, MessageList} from "@chatscope/chat-ui-kit-react";
import MsgListComponent from "../../../components/chat/MsgListComponent.tsx";
import {Chat} from "../../../components/chat/Chat.tsx";
import voiceHook from "../../../components/chat/voiceHook.ts";
import {migHost} from "../../../util/apiInof.ts";

export const ChatManage:React.FC<ExpertChatManage> = ({
    ChckToRequestChat
                                                     }) => {

    // const cspfDev = import.meta.env.VITE_DEV_CSPF_HOST
    const cspfDev = migHost()
    const [userCode, setUserCode] = useState<string>()
    const [chatRooms, setChatRooms] = useState<ChatRoom[]>([])
    const [selectedChatRoom, setSelectedChatRoom] = useState<ChatRoom | null>(null);

    const [showChatModal, setShowChatModal] = useState(false);
    const [voiceState, setVoiceState] = useState(false); // Voice call state

    const [isDragging, setIsDragging] = useState(false);
    const [position, setPosition] = useState({ top: 400, right: 4 });

    // const { startVoice, endVoice } = voiceHook(selectedChatRoom?.chatRoomID); // Voice hook for handling voice calls

    useEffect(() => {

            axiosGet(`${cspfDev}user/profile`).then((res) => {
                if(res?.status === 200){
                    // console.log(res.data)
                    axiosGet(`${cspfDev}user/${res.data.username}`).then((res) => {
                        if(res?.status === 200){
                            setUserCode(res.data.userCode)
                            // console.log(res.data)
                        }
                    })
                }
            })

        axiosGet(`${cspfDev}chatRoom/user/access`).then((res) => {
            setChatRooms(res?.data.content)
        })
    }, [userCode]);

    const connectChat = (chatRoom: ChatRoom) => {
        setSelectedChatRoom(chatRoom); // Set the selected chat room
        setShowChatModal(true); // Show the modal
    }

    const chatCloase = () => {
        setShowChatModal(false);
    }

    const voiceChatOpen = () => {
        // startVoice();
        setVoiceState(true);
    };

    const voiceChatClose = () => {
        // endVoice();
        setVoiceState(false);
    };


    return (
        <>
        <Card className="mt-4">
            <Card.Header className={'position-relative'}>
                <div className="card-actions float-right">
                    <Dropdown className={'position-absolute top-0 end-0'}>
                        <Dropdown.Toggle variant="link" className="text-muted">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className="feather feather-more-horizontal align-middle"
                            >
                                <circle cx="12" cy="12" r="1"></circle>
                                <circle cx="19" cy="12" r="1"></circle>
                                <circle cx="5" cy="12" r="1"></circle>
                            </svg>
                        </Dropdown.Toggle>
                        <Dropdown.Menu className={'position-relative'}>
                            <Dropdown.Item href="#" onClick={ChckToRequestChat}>채팅 신청 내역<span
                                className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                                          99+
                                          <span className="visually-hidden">unrequest</span></span></Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                </div>
                <h5 className="card-title mb-0">채팅 관리</h5>
            </Card.Header>
            <Card.Body>
                <Row className={'mb-2'}>
                    <Col md={3}>대화 상대</Col>
                    <Col md={4} className={'position-relative'}>채팅방</Col>
                    <Col md={3}>Lasted</Col>
                    <Col md={2}>연결</Col>
                </Row>
                {chatRooms?.map((chatRoom) => (
                <Row>
                    <Col md={3}>{(userCode === chatRoom.accessUser.owner) ? (chatRoom.accessUser.access[1]) : (chatRoom.accessUser.owner)}</Col>
                    <Col md={4} className={'position-relative'}>{chatRoom.chatRoom}<span
                        className="badge text-bg-secondary position-absolute top-0 end-0">0</span></Col>
                    <Col md={3}>오후 5시 00분</Col>
                    <Col md={2}><Button onClick={() => connectChat(chatRoom)}>입장</Button></Col>
                </Row>
                ))}
                <Row>
                    <Col md={3}>user2</Col>
                    <Col md={4} className={'position-relative'}>Chat-1<span
                        className="badge text-bg-secondary position-absolute top-0 end-0">0</span></Col>
                    <Col md={3}>-</Col>
                    <Col md={2}><Button>연결</Button></Col>
                </Row>
            </Card.Body>
        </Card>

            {/* 플로팅 채팅 창 */}
            {showChatModal && (
                <div
                    className="floating-chat"
                    style={{
                        position: "fixed",
                        top: position.top,
                        right: `${position.right}px`,
                        zIndex: 1050,
                        width: "410px",
                        // height: "600px",
                        background: "white",
                        boxShadow: "0px 0px 10px rgba(0,0,0,0.3)",
                        borderRadius: "10px",
                    }}
                >
                    <div className="floating-chat-body" style={{ padding: "5px", overflowY: "auto", height: "calc(100% - 100px)" }}>
                        {selectedChatRoom && (
                            <Chat roomChat={selectedChatRoom} onClosed={chatCloase} userCode = {userCode}  />
                        )}
                    </div>
                </div>
            )}
    </>
    )
}