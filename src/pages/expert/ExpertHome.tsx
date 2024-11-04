import { Card, Col, Container, Nav, Row } from 'react-bootstrap';
import { Link, Outlet } from 'react-router-dom';
import '@/style/wrapper.css';
import {useEffect, useState} from "react";
import {ExpertEntity} from "../../components/user/props/ExpertProps.ts";
import {axiosGet} from "@/util/axiosData.ts";
import {migHost} from "@/util/apiInof.ts";
import {setCookie} from "@/util/cookie.ts";

export const ExpertHome = () => {

  // useEffect(() => {
  //   axiosGet(`${migHost()}expert`).then((res)=>{
  //   })
  // }, []);

  return (
    <div className={'home-wrapper'}>
      <div className={'home-wrapper-content'}>
        <Container fluid={true} className={'p-0'}>
          <Row>
            <Col xs={12} md={12} lg={12}>
              <h1 className={'mb-3'}>CSPF</h1>
            </Col>
          </Row>
          <Row>
            <Col xs={12} xl={3} md={3}>
              <Card>
                <Card.Header>
                  <h5 className="card-title mb-0">Menu</h5>
                </Card.Header>

                  <Row>
                    <Col>
                      <Nav variant="pills" className="flex-column list-group list-group-flush">
                        <Nav.Item>
                          <Nav.Link as={Link} to={'/expert/myPage'} className="list-group-item list-group-item-action">마이페이지</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                          <Nav.Link as={Link} to={'/expert/announcement'} className="list-group-item list-group-item-action">공지</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                          <Nav.Link as={Link} to={'/expert/questions'} className="list-group-item list-group-item-action">문의사항</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                          <Nav.Link as={Link} to={'/expert/searchNews?query=동물보호'} className="list-group-item list-group-item-action">뉴스</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                          <Nav.Link as={Link} to={'/expert/caseLaw?query=동물보호'} className="list-group-item list-group-item-action">판례</Nav.Link>
                        </Nav.Item>
                      </Nav>
                    </Col>
                  </Row>

              </Card>
            </Col>
            <Col xs={12} md={9} xl={9}>
              <Outlet />
            </Col>
          </Row>
          <Row>
            <Col>
              Footer
            </Col>
          </Row>
        </Container>
      </div>
    </div>
  );
}