import { Card, Col, Container, Nav, Row } from 'react-bootstrap';
import { Link, Outlet } from 'react-router-dom';
import '../../style/wrapper.css';

export const AdminHome = () => {




  return (
    <div className={'home-wrapper'}>
      <div className={'home-wrapper-content'}>
        <Container fluid={true}>
          <Row>
            <Col xs={12} md={12} lg={12}>
              <h1>CSPF Manager</h1>
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
                        <Nav.Link as={Link} to={'/admin/userManage'} className="list-group-item list-group-item-action">유저</Nav.Link>
                      </Nav.Item>
                      <Nav.Item>
                        <Nav.Link as={Link} to={'/admin/expertManage'} className="list-group-item list-group-item-action">전문가</Nav.Link>
                      </Nav.Item>
                      <Nav.Item>
                        <Nav.Link as={Link} to={'/admin/chatManage'} className="list-group-item list-group-item-action">채팅</Nav.Link>
                      </Nav.Item>
                      <Nav.Item>
                        <Nav.Link as={Link} to={'/admin/announManage'} className="list-group-item list-group-item-action">공지</Nav.Link>
                      </Nav.Item>
                      <Nav.Item>
                        <Nav.Link as={Link} to={'/admin/questionsManage'} className="list-group-item list-group-item-action">문의사항</Nav.Link>
                      </Nav.Item>
                      <Nav.Item>
                        <Nav.Link as={Link} to={'/admin/chckCert'} className="list-group-item list-group-item-action">자격확인</Nav.Link>
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