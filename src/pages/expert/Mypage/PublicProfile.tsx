import {
  Button,
  Card,
  CardBody,
  Col,
  Dropdown,
  Form,
  Row,
} from 'react-bootstrap'
import React from 'react'
import { ExpertPublicFormProp } from '../../../components/user/props/ExpertProps.ts'
import { useExpertInfo } from '@/store/expertStore.ts'

export const PublicProfile: React.FC<ExpertPublicFormProp> = ({
  handleSetDetailProfile,
}) => {
  const profile = useExpertInfo()
  console.log(`profile ${profile}`)
  const publicProfile = profile.profile

  return (
    <Card>
      <Card.Header className={' position-relative'}>
        <div className='card-actions float-right'>
          <Dropdown className={'position-absolute top-0 end-0'}>
            <Dropdown.Toggle variant='link' className='text-muted'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                width='24'
                height='24'
                viewBox='0 0 24 24'
                fill='none'
                stroke='currentColor'
                strokeWidth='2'
                strokeLinecap='round'
                strokeLinejoin='round'
                className='feather feather-more-horizontal align-middle'
              >
                <circle cx='12' cy='12' r='1'></circle>
                <circle cx='19' cy='12' r='1'></circle>
                <circle cx='5' cy='12' r='1'></circle>
              </svg>
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item href='#' onClick={handleSetDetailProfile}>
                상세 프로필 작성
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>
        <h5 className='card-title mb-0'>공개 프로필</h5>
      </Card.Header>
      <Card.Body>
        <Form>
          <Row>
            <Col md={8} className={'mt-5'}>
              <Form.Group controlId='inputUsername' className={'mt-1'}>
                <Row>
                  <Col md={6}>
                    <Form.Label>성함</Form.Label>
                  </Col>
                  <Col md={6}>
                    <Form.Label>회사명</Form.Label>
                  </Col>
                </Row>
              </Form.Group>

              <Form.Group controlId='inputBio' className={'mt-4'}>
                <Row>
                  <Col md={6}>
                    <Form.Label>{profile && profile.name}</Form.Label>
                  </Col>
                  <Col md={6}>
                    <Form.Label>{profile && profile.company}</Form.Label>
                  </Col>
                </Row>
              </Form.Group>
            </Col>
            <Col md={4}>
              <div className='text-center'>
                <img
                  alt={`${profile?.name}님의 프로필 이미지`}
                  src={
                    profile &&
                    (profile.image
                      ? profile.image
                      : `https://bootdey.com/img/Content/avatar/avatar1.png`)
                  }
                  className='rounded-circle img-responsive mt-2'
                  width='128'
                  height='128'
                />
                <div className='mt-2'>
                  <Button variant='primary'>
                    <i className='fa fa-upload'></i>
                  </Button>
                </div>
                <small>최소 128px x 128px 크기의 .jpg 형식 이미지 업로드</small>
              </div>
            </Col>
          </Row>
          <Row>
            <Col md={12}>
              <p className={'fs-5 pt-5 text-lg-start'}>
                상세 프로필(경력, 상품 등)
              </p>
              <footer className='blockquote-footer ms-4 text-lg-start'>
                정보는 오른쪽 상단 바를 통해 추가해주세요.
              </footer>
            </Col>
          </Row>
          <Row>
            <Col>
              <Card className={'h-100'}>
                <CardBody className={'text-start p-2'}>
                  <Row className={'mb-2'}>
                    <Col md={5}>경력</Col>
                    <Col md={5}>상품 or 주분야</Col>
                    <Col md={{ offset: 2 }}></Col>
                  </Row>
                  <Row>
                    <Col md={5}>
                      {publicProfile && publicProfile.workexperience}
                    </Col>
                    <Col md={5}>{publicProfile && publicProfile.product}</Col>
                    <Col md={{ offset: 2 }}></Col>
                  </Row>
                </CardBody>
              </Card>
            </Col>
          </Row>
          <Row>
            <Col md={12}>
              <p className={'fs-5 pt-5 text-lg-start'}>
                상세 프로필(회사 정보)
              </p>
              <footer className='blockquote-footer ms-4 text-lg-start'>
                정보는 오른쪽 상단 바를 통해 추가해주세요.
              </footer>
            </Col>
          </Row>
          <Row>
            <Col>
              <Card className={'h-100'}>
                <CardBody className={'text-start p-2'}>
                  <Row className={'mb-2'}>
                    <Col md={7}>
                      {publicProfile && publicProfile.companyaddr}
                    </Col>
                    <Col md={3}>{publicProfile && publicProfile.image}</Col>
                    <Col md={{ offset: 2 }}></Col>
                  </Row>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Form>
      </Card.Body>
    </Card>
  )
}
