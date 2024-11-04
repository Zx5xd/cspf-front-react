import { Button, Card, Col, Dropdown, Row } from "react-bootstrap";
import React, { useEffect, useState } from "react";
import { ExpertChatManage } from "../../../components/user/props/ExpertProps.ts";
import { axiosGet } from "../../../util/axiosData.ts";
import { ChatRoom } from "../../../components/chat/chatInterface.ts";
import Chat from "../../../components/chat/Chat.tsx";
import { migHost } from "../../../util/apiInof.ts";

export const ChatManage: React.FC<ExpertChatManage> = ({ ChckToRequestChat }) => {
    const cspfDev = migHost();
    const [userCode, setUserCode] = useState<string>();
    const [chatRooms, setChatRooms] = useState<ChatRoom[]>([]);
    const [selectedChatRoom, setSelectedChatRoom] = useState<ChatRoom | null>(null);
    const [showChatModal, setShowChatModal] = useState(false);
    const [voiceState, setVoiceState] = useState(false);

    useEffect(() => {
        axiosGet(`${cspfDev}user/profile`).then((res) => {
            if (res?.status === 200) {
                axiosGet(`${cspfDev}user/${res.data.username}`).then((res) => {
                    if (res?.status === 200) {
                        setUserCode(res.data.userCode);
                    }
                });
            }
        });

        axiosGet(`${cspfDev}chatRoom/user/access`).then((res) => {
            setChatRooms(res?.data.content);
        });
    }, [userCode]);

    const connectChat = (chatRoom: ChatRoom) => {
        setSelectedChatRoom(chatRoom);
        setShowChatModal(true);
    };

    const closeChat = () => {
        setShowChatModal(false);
    };

    const toggleVoiceChat = () => {
        setVoiceState(!voiceState);
    };

    return (
        <>
            <Card className="mt-4">
                <Card.Header className="position-relative">
                    <div className="card-actions float-right">
                        <Dropdown className="position-absolute top-0 end-0">
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
                            <Dropdown.Menu className="position-relative">
                                <Dropdown.Item href="#" onClick={ChckToRequestChat}>
                                    채팅 신청 내역
                                    <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                                        99+
                                        <span className="visually-hidden">unrequest</span>
                                    </span>
                                </Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                    </div>
                    <h5 className="card-title mb-0">채팅 관리</h5>
                </Card.Header>
                <Card.Body>
                    <Row className="mb-2">
                        <Col md={3}>대화 상대</Col>
                        <Col md={4} className="position-relative">채팅방</Col>
                        <Col md={3}>Lasted</Col>
                        <Col md={2}>연결</Col>
                    </Row>
                    {chatRooms?.map((chatRoom, index) => (
                        <Row key={index}>
                            <Col md={3}>
                                {(userCode === chatRoom.accessUser.owner) ? (chatRoom.accessUser.access[1]) : (chatRoom.accessUser.owner)}
                            </Col>
                            <Col md={4} className="position-relative">
                                {chatRoom.chatRoom}
                                <span className="badge text-bg-secondary position-absolute top-0 end-0">0</span>
                            </Col>
                            <Col md={3}>오후 5시 00분</Col>
                            <Col md={2}><Button onClick={() => connectChat(chatRoom)}>입장</Button></Col>
                        </Row>
                    ))}
                </Card.Body>
            </Card>

            {/* 플로팅 채팅 창 */}
            {showChatModal && (
                <div className="fixed bottom-4 right-4 w-80 bg-white rounded-lg shadow-lg z-50">
                    <div className="overflow-y-auto rounded-lg h-3/5">
                        {selectedChatRoom && (
                            <Chat roomChat={selectedChatRoom} onClosed={closeChat} userCode={userCode || ""} />
                        )}
                    </div>
                </div>
            )}
        </>
    );
};
