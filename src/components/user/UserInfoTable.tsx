import React from 'react'
import { Button, Card, Col, Row, Table } from 'react-bootstrap'
import { convertToKoreanTime } from '@/util/convertDate.ts'
import { UserInfoProps } from '@/components/user/props/UserProps.ts'
import {
  BookingHeaderProps,
  BookingProps,
  ExpertInfoProps,
} from '@/components/user/props/ItemProps.ts'
import { CheckCerttableProps } from '@/components/user/props/AdminProps.ts'
import { useBookingManage } from '@/hooks/useBookingManage.ts'
import {
  ChatReqItemProps,
  ChatReqProp,
} from '@/pages/expert/Mypage/ChatReq.tsx'
import { useExpertInfo } from '@/store/useExpertStore.ts'
import { useChatReqManage } from '@/hooks/useChatReqManage.ts'

export const UsertableItem: React.FC<UserInfoProps> = ({
  userCode,
  name,
  email,
  handleEdit,
  handleDelete,
  user,
}) => {
  return (
    <Table striped bordered hover className='mt-3'>
      <thead>
        <tr>
          <th>userCode</th>
          <th>이름</th>
          <th>이메일</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr key={userCode}>
          <td>{userCode}</td>
          <td>{name}</td>
          <td>{email}</td>
          <td>
            <Button
              variant='info'
              onClick={() => handleEdit(user)}
              className='me-2'
            >
              Edit
            </Button>
            <Button variant='danger' onClick={() => handleDelete(userCode)}>
              Delete
            </Button>
          </td>
        </tr>
      </tbody>
    </Table>
  )
}

export const ExperttableItem: React.FC<ExpertInfoProps> = ({
  name,
  email,
  handleEdit,
  handleDelete,
  user,
  expert,
}) => {
  return (
    <Table striped bordered hover className='mt-3'>
      <thead>
        <tr>
          <th>userCode</th>
          <th>이름</th>
          <th>이메일</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr key={expert.expertCode}>
          <td>{expert.expertCode}</td>
          <td>{name}</td>
          <td>{email}</td>
          <td>
            <Button
              variant='info'
              onClick={() => handleEdit(user)}
              className='me-2'
            >
              Edit
            </Button>
            <Button
              variant='danger'
              onClick={() => handleDelete(expert.expertCode || '')}
            >
              Delete
            </Button>
          </td>
        </tr>
      </tbody>
    </Table>
  )
}

export const CerttableItem: React.FC<CheckCerttableProps> = ({
  expert,
  CheckButton,
}) => {
  return (
    <Table striped bordered hover className='mt-3'>
      <thead>
        <tr>
          <th>이름</th>
          <th>회사명</th>
          <th>전화번호</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr key={expert?.expertCode}>
          <td>{expert?.name}</td>
          <td>{expert?.company}</td>
          <td>{expert?.phone}</td>
          <td>
            <Button
              variant='info'
              onClick={() => CheckButton(expert)}
              className='me-2'
            >
              자격 확인
            </Button>
          </td>
        </tr>
      </tbody>
    </Table>
  )
}

export const BookingHeaderItem: React.FC<BookingHeaderProps> = ({
  children,
  statusType,
}) => {
  return (
    <Card className='mt-4'>
      <Card.Header className={'position-relative'}>
        <h5 className='card-title mb-0'>예약 {statusType}</h5>
      </Card.Header>
      <Card.Body>
        <Row className='mb-3'>
          <Col md={2}>예약자명</Col>
          <Col md={2}>희망 날짜</Col>
          <Col md={2}>희망 시간</Col>
          <Col md={2}>
            펫 정보
            <br />
            (견종/나이)
          </Col>
          <Col md={2}>신청날짜</Col>
          {statusType === '현황' ? (
            <Col md={2}>완료처리</Col>
          ) : (
            <Col md={2}>수락/거부</Col>
          )}
        </Row>
        <>{children}</>
      </Card.Body>
    </Card>
  )
}

export const BookingHeaderItem2: React.FC<BookingHeaderProps> = ({
  children,
  statusType,
}) => {
  return (
    <Card className='mt-4'>
      <Card.Header className={'position-relative'}>
        <h5 className='card-title mb-0'>예약 {statusType}</h5>
      </Card.Header>
      <Card.Body>
        <Row className='mb-3'>
          <Col>예약자명</Col>
          <Col>희망 날짜</Col>
          <Col>희망 시간</Col>
          <Col>
            펫 정보
            <br />
            (견종/나이)
          </Col>
          <Col>신청날짜</Col>
        </Row>
        <>{children}</>
      </Card.Body>
    </Card>
  )
}

export const BookingItem: React.FC<BookingProps> = ({ booking }) => {
  const { updateBookStatus } = useBookingManage()

  return (
    <Row className='mb-2' key={booking.hosReservationId}>
      <Col className='mt-4' md={2}>
        {booking.owner.name}
      </Col>
      <Col className='mt-4' md={2}>
        {booking.resvDate}
      </Col>
      <Col className='mt-4' md={2}>
        {booking.prefTime}
      </Col>
      <Col className='mt-3' md={2}>
        {booking.pet.kindNm} {booking.pet.Birthday}
      </Col>
      <Col md={2} className='text-wrap, mt-3' style={{ width: '8rem' }}>
        {convertToKoreanTime(booking.createdAt.toString())}
      </Col>
      {booking.resvStatus === 0 ? (
        <Col>
          <Button
            variant='outline-dark'
            className='mb-2'
            onClick={() => updateBookStatus(booking.hosReservationId, 1)}
          >
            수락
          </Button>
          <Button
            variant='outline-warning'
            className='mb-2'
            onClick={() => updateBookStatus(booking.hosReservationId, 9)}
          >
            거부
          </Button>
        </Col>
      ) : (
        <Col>
          <Button
            variant='outline-info'
            className='mb-2 mt-3'
            onClick={() => updateBookStatus(booking.hosReservationId, 2)}
          >
            완료
          </Button>
        </Col>
      )}
    </Row>
  )
}

export const BookingItem2: React.FC<BookingProps> = ({ booking }) => {
  return (
    <Row className='mb-2' key={booking.hosReservationId}>
      <Col className='mt-4'>{booking.owner.name}</Col>
      <Col className='mt-4'>{booking.resvDate}</Col>
      <Col className='mt-4'>{booking.prefTime}</Col>
      <Col className='mt-3'>
        {booking.pet.kindNm} {booking.pet.Birthday}
      </Col>
      <Col className='text-wrap, mt-3' style={{ width: '8rem' }}>
        {convertToKoreanTime(booking.createdAt.toString())}
      </Col>
    </Row>
  )
}

export const ChatReqHeaderItem: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const userCode = useExpertInfo()

  return (
    <Card className='mt-4'>
      <Card.Body>
        <Row className='mb-3'>
          <Col>예약자명</Col>
          {userCode?.expertCode?.charAt(0) === 'L' ? (
            <>
              <Col>희망 날짜</Col>
              <Col>희망 시간</Col>
            </>
          ) : null}
          <Col>신청날짜</Col>
          <Col>수락/거부</Col>
        </Row>
        <>{children}</>
      </Card.Body>
    </Card>
  )
}

export const ChatReqItem: React.FC<ChatReqItemProps> = ({
  lawChatReq,
  InsChatReq,
}) => {
  const { commitChat, denyChat } = useChatReqManage()
  return (
    <Row
      className='mb-2'
      key={lawChatReq?.lawChatReqId ?? InsChatReq?.insChatReqNumber}
    >
      <Col className='mt-4'>
        {lawChatReq?.ownerCode.name ?? InsChatReq?.ownerCode.name}
      </Col>
      {lawChatReq ? (
        <>
          <Col className='mt-4'>{lawChatReq?.reqDate}</Col>
          <Col className='mt-4'>{lawChatReq?.prefTime}</Col>
        </>
      ) : null}
      <Col className='text-wrap, mt-3' style={{ width: '8rem' }}>
        {convertToKoreanTime(
          lawChatReq.createdAt.toString() ?? InsChatReq.createdAt.toString()
        )}
      </Col>
      <Col>
        <Button
          variant='outline-dark'
          className='mb-2'
          onClick={() => commitChat(lawChatReq.lawChatReqId)}
        >
          수락
        </Button>
        <Button
          variant='outline-warning'
          className='mb-2'
          onClick={() => denyChat(lawChatReq.lawChatReqId, lawChatReq)}
        >
          거부
        </Button>
      </Col>
    </Row>
  )
}
