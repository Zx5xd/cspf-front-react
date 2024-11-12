import { Button, Col, Modal, Row } from 'react-bootstrap'
import React, { useState } from 'react'
import {
  reqInsurerInterface,
  reqLawyerIntface,
  useChatReqManage,
} from '@/hooks/useChatReqManage.ts'
import {
  ChatReqHeaderItem,
  ChatReqItem,
} from '@/components/user/UserInfoTable.tsx'

export interface ChatReqProp {
  lawChatReq?: reqLawyerIntface[]
  InsChatReq?: reqInsurerInterface[]
  showReqChatModal: boolean
  setCloseModal: () => void
}

export interface ChatReqItemProps {
  lawChatReq?: reqLawyerIntface
  InsChatReq?: reqInsurerInterface
}

export const ChatReq: React.FC<ChatReqProp> = ({
  lawChatReq,
  InsChatReq,
  setCloseModal,
  showReqChatModal,
}) => {
  return (
    <Modal show={showReqChatModal} className={'modal-xl'}>
      <Modal.Header onHide={() => setCloseModal()} closeButton>
        <Modal.Title>채팅신청 내역</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <ChatReqHeaderItem>
          {lawChatReq &&
            lawChatReq.map((reqChat) => {
              return (
                <>
                  <ChatReqItem
                    lawChatReq={reqChat}
                    key={reqChat.lawChatReqId}
                  />
                </>
              )
            })}
          {InsChatReq &&
            InsChatReq.map((reqChat) => {
              return (
                <>
                  <ChatReqItem
                    InsChatReq={reqChat}
                    key={reqChat.insChatReqNumber}
                  />
                </>
              )
            })}
        </ChatReqHeaderItem>
      </Modal.Body>
    </Modal>
  )
}
