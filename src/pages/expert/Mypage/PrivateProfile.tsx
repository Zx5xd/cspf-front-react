import {Card, Col, Dropdown, Form, Row} from "react-bootstrap";
import React from "react";
import {PrivateProfileProps} from "../../../components/user/props/ExpertProps.ts";
import { useExpertInfo } from '@/store/expertStore.ts';

export const PrivateProfile:React.FC<PrivateProfileProps> = ({
    handleSetPassword, handleEdit
                                                             }) => {
    const profile = useExpertInfo()
    console.log(`profile ${profile}`)

    return (
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
                        <Dropdown.Menu>
                            <Dropdown.Item href="#" onClick={handleEdit}>회원정보 수정</Dropdown.Item>
                            <Dropdown.Item href="#" onClick={handleSetPassword}>비밀번호 변경</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                </div>
                <h5 className="card-title mb-0">개인 정보</h5>
            </Card.Header>
            <Card.Body>
                <Form>
                    <Row className={'mt-2'}>
                        <Col md={6}>
                            <Form.Floating className="mb-3">
                                <Form.Control
                                    type="text"
                                    id="floatingPlaintextInput"
                                    value={profile?.username}
                                    readOnly
                                    plaintext />
                                <label htmlFor="floatingPlaintextInput">Id</label>
                            </Form.Floating>
                        </Col>
                        <Col md={6}>
                            <Form.Floating className="mb-3">
                                <Form.Control
                                    type="email"
                                    id="floatingPlaintextInput"
                                    value={profile?.email}
                                    readOnly
                                    plaintext />
                                <label htmlFor="floatingPlaintextInput">Email</label>
                            </Form.Floating>
                        </Col>
                    </Row>
                    <Row>
                        <Col md={6}>
                            <Form.Floating>
                                <Form.Control
                                    type="password"
                                    id="floatingPlaintextInput"
                                    value={profile?.password}
                                    readOnly
                                    plaintext />
                                <label htmlFor="floatingPlaintextInput">Password</label>
                            </Form.Floating>
                        </Col>
                        <Col md={6}>
                            <Form.Floating>
                                <Form.Control
                                    type="text"
                                    id="floatingPlaintextInput"
                                    placeholder="010-1234-5678"
                                    value={profile?.phone}
                                    readOnly
                                    plaintext />
                                <label htmlFor="floatingPlaintextInput">Phone</label>
                            </Form.Floating>
                        </Col>
                    </Row>
                </Form>
            </Card.Body>
        </Card>
    )
}