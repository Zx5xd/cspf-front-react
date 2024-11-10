import React, {useEffect, useRef, useState} from 'react';
import { Button, Table, Col, Row } from 'react-bootstrap';
import {convertToKoreanTime} from "../../util/convertDate.ts";
import {ChatRoom, ChatLog} from "../../components/chat/chatInterface.ts";
import { useChatComplain } from '@/hooks/useChatComplain.ts';
import CompMessageList from '@/components/chat/fragment/CompMessageList.tsx';

export const ChatManage: React.FC = () => {

  const [selectedChat, setSelectedChat] = useState<ChatRoom | undefined>(undefined);
  const [roomLogs, setRoomLogs] = useState<ChatLog[]>([]);

  const [hide, setHide] = useState(false);

  const modalBodyRef = useRef<HTMLDivElement | null>(null);
  const [isBottom, setIsBottom] = useState(false);
  
  const {compList, getCompInfo, compInfo, getComplainChatLogs, compLogs} = useChatComplain()

  // 컴포넌트가 처음 마운트될 때 유저 데이터를 가져옴
  useEffect(() => {
    console.log(compInfo)
    if (compInfo) {
      console.log('compInfo Success', compInfo)
      getComplainChatLogs(compInfo);
    }
  }, [hide]);

  const handleGetInfo = async (id: number) => {
    await getCompInfo(id)
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


  const closeChat = () => {
    setHide(false);
  }

  return (
    <div>
      <Row>
        <Col md={12}>
          <Table striped bordered hover className="mt-3">
            <thead>
              <tr>
                <th>신고번호</th>
                <th>신고자</th>
                <th>가해자</th>
                <th>신고사유</th>
                <th>생성일자</th>
              </tr>
            </thead>
            <tbody>
              {compList.map((cp) => (
                <tr key={cp.id}>
                  <td>{cp.id}</td>
                  <td>{cp.declarer}</td>
                  <td>{cp.perpetrator}</td>
                  <td>{cp.description || '-'}</td>
                  <td className={'text-wrap;'} style={{ width: '7rem' }}>
                    {convertToKoreanTime(cp.createdAt)}
                  </td>
                  <td>
                    <Button
                      variant="info"
                      onClick={() => handleGetInfo(cp.id)}
                      className="me-2"
                    >
                      조회
                    </Button>
                  </td>
                </tr>
              ))}</tbody>
          </Table>
        </Col>
      </Row>
       플로팅 채팅 창
      {hide && (
        <div className="fixed bottom-4 right-4 w-80 bg-white rounded-lg shadow-lg z-50">
          <div className="overflow-y-auto rounded-lg h-3/5">
            {compInfo && (
              <CompMessageList compLogs={compLogs} compInfo={compInfo}/>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
