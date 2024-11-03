import {Button, Card, Col, Row} from "react-bootstrap";
import React from "react";

export const Availability:React.FC = () => {
    return (
        <Card className="mt-4">
            <Card.Header className={'position-relative'}>
                <h5 className="card-title mb-0">예약관리</h5>
            </Card.Header>
            <Card.Body>
                <Row>
                    <Col md={3}>예약자명</Col>
                    <Col md={2}>희망 날짜</Col>
                    <Col md={2}>희망 시간</Col>
                    <Col md={3}>신청날짜</Col>
                    <Col md={2}>연결/예약취소</Col>
                </Row>
                <Row>
                    <Col md={3}>user1</Col>
                    <Col md={2}>24.10.05</Col>
                    <Col md={2}>09:00</Col>
                    <Col md={3}>24.10.03</Col>
                    <Col md={2}><Button>연결</Button><Button>취소</Button></Col>
                </Row>
            </Card.Body>
        </Card>
    )
}