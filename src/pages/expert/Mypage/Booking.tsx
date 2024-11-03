import {Button, Card, Col, Row} from "react-bootstrap";
import React from "react";

export const Booking:React.FC = () =>{
    return (
        <Card className="mt-4">
            <Card.Header className={'position-relative'}>
                <h5 className="card-title mb-0">예약 신청 내역</h5>
            </Card.Header>
            <Card.Body>
                <Row>
                    <Col md={3}>예약자명</Col>
                    <Col md={2}>희망 날짜</Col>
                    <Col md={2}>희망 시간</Col>
                    <Col md={3}>신청날짜</Col>
                    <Col md={2}>수락/거부</Col>
                </Row>
                <Row>
                    <Col md={3}>user1</Col>
                    <Col md={2}>24.10.05</Col>
                    <Col md={2}>오전 09:00</Col>
                    <Col md={3}>24.10.03</Col>
                    <Col md={2}><Button>수락</Button><Button>거부</Button></Col>
                </Row>
            </Card.Body>
        </Card>


    )
}