import React, {useState} from 'react';
import { Button, Col, Form,  FormLabel, Modal, Row } from 'react-bootstrap';
import {
    EditPassFormProps, ExpertDetailProfileModalProps,
    UserEditModalProps,
} from './props/UserProps.ts';
import {
    AdminExpertEditModalProps,
    AnnAndQuesWriteModalProps,
    ChckCertModalProps
} from './props/AdminProps.ts';
import {ExpertEditModalProps} from "./props/ExpertProps.ts";
import {axiosPost} from "../../util/axiosData.ts";

 // 관리자 - Expert 계정 정보 수정 모달
export const UserEditModal: React.FC<UserEditModalProps> = ({
                                                              show,
                                                              handleClose,
                                                              handleSave,
                                                              formData,
                                                              handleInputChange,
                                                              handleCheck,
                                                              editingUser
                                                            }) => {
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Edit User</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="userName" className="mt-3">
            <Form.Label>{editingUser?.username}</Form.Label>
          </Form.Group>
          <Form.Group controlId="userPassword" className="mt-3">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter password"
              name="password"
              value={formData?.password}
              onChange={handleInputChange}
            />
          </Form.Group>
          <Form.Group controlId="nickname" className="mt-3">
            <Form.Label>Nickname</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter nickname"
              name="nickname"
              value={formData?.nickname}
              onChange={handleInputChange}
            />
          </Form.Group>
          <Form.Group controlId="userEmail" className="mt-3">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              name="email"
              value={formData?.email}
              onChange={handleInputChange}
            />
          </Form.Group>
          <Form.Group controlId="address" className="mt-3">
            <Form.Label>Address</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Address"
              name="address"
              value={formData?.address}
              onChange={handleInputChange}
            />
          </Form.Group>
          <Form.Group controlId="phone" className="mt-3">
            <Form.Label>Phone</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter phone"
              name="phone"
              value={formData?.phone}
              onChange={handleInputChange}
            />
          </Form.Group>
          <Form.Group controlId="petOwnership" className="mt-3">
            <Form.Label>PetOwnership</Form.Label>
            <Form.Check
              type="checkbox"
              label="Do you own a pet?"
              name="petOwnership"
              checked={formData?.petOwnership === 'true'}
              onChange={handleCheck}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>Close</Button>
        <Button variant="primary" onClick={handleSave}>Save Changes</Button>
      </Modal.Footer>
    </Modal>
  );
};



// 관리자 - 공지 작성 모달
export const AdminAnnounWriteModal:React.FunctionComponent<AnnAndQuesWriteModalProps> = ({
                                                                                            show, handleClose, formData, handleInputChange, handleSave
                                                                                          }) => {
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>공지작성</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="announcementTitle" className="mt-3">
            <Form.Control
              type="text"
              placeholder={formData?.title}
              name="title"
              onChange={handleInputChange}
            />
          </Form.Group>
          <Form.Group controlId="announcementTitle" className="mt-3">
            <Form.Control
              as="textarea"
              placeholder={formData?.content}
              name="content"
              onChange={handleInputChange}
              rows={5}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>Close</Button>
        <Button variant="primary" onClick={handleSave}>Save Changes</Button>
      </Modal.Footer>
    </Modal>
  )
}

// 관리자 - 공지 수정 모달
export const AdminAnnounUpdateModal:React.FunctionComponent<AnnAndQuesWriteModalProps> = ({
                                                                                              show, handleClose, formData, handleInputChange, handleSave
                                                                                          }) => {
    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>공지수정</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group controlId="announcementTitle" className="mt-3">
                        <Form.Control
                            type="text"
                            placeholder={formData?.title}
                            name="title"
                            onChange={handleInputChange}
                        />
                    </Form.Group>
                    <Form.Group controlId="announcementTitle" className="mt-3">
                        <Form.Control
                            as="textarea"
                            placeholder={formData?.content}
                            name="content"
                            onChange={handleInputChange}
                            rows={5}
                        />
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>Close</Button>
                <Button variant="primary" onClick={handleSave}>Save Changes</Button>
            </Modal.Footer>
        </Modal>
    )
}


// 관리자 - Expert, 제출한 자격 증명 확인 모달
export const CheckCertInfoModal:React.FunctionComponent<ChckCertModalProps> = ({
                                                                           show, handleClose, handleSave, formData, image, visionText, denyCert, visionStart, hidden            }) => {

    console.log(image)
  return (
    <Modal show={show} onHide={handleClose} centered size="lg">
      <Modal.Header closeButton>
        <Modal.Title>자격 확인</Modal.Title>
      </Modal.Header>
      <Modal.Body className="p-0" style={{ overflow: 'hidden' }}>
        <FormLabel column={'sm'}>{formData && formData.name}&nbsp;&nbsp;{formData && formData.company}</FormLabel>

        {image ? (
            <><Row>
                <Col xl={6} md={6}>
                    <img src={image} alt="Cert" style={{width: '100%', height: 'auto', display: 'block'}}/>
                </Col>
                <Col xl={6} md={6}>
                    {hidden && <p style={{ whiteSpace: 'pre-wrap' }}>{visionText}</p> }
                   <Button onClick={visionStart}>Vision</Button>
                </Col>
            </Row>
            </> // 이미지 표시
        ) : (
          <p>이미지를 불러오는 중입니다...</p> // 이미지가 없을 때의 메시지
        )}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="primary" onClick={() => handleSave(formData)}>등록</Button>
        <Button variant="secondary" onClick={() => denyCert(formData)}>거부</Button>
      </Modal.Footer>
    </Modal>
  )
}

export const EditPassModal:React.FC<EditPassFormProps> = (
  {
    handleInputChange, handleClose, handleSave, formData, show
  }
) =>{
  return(
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>비밀번호 변경</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="pwd1" className="mt-3">
            <Form.Control
              type="password"
              placeholder="변경할 패스워드"
              name="pwd1"
              value={formData?.pwd1}
              onChange={handleInputChange}
            />
          </Form.Group>
          <Form.Group controlId="pwd2" className="mt-3">
            <Form.Control
              type="password"
              placeholder="패스워드 확인"
              name="pwd2"
              value={formData?.pwd2}
              onChange={handleInputChange}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>Close</Button>
        <Button variant="primary" onClick={handleSave}>Save Changes</Button>
      </Modal.Footer>
    </Modal>
  )
}

export const DetailProfileSetModal:React.FC<ExpertDetailProfileModalProps> = ({
  show, handleClose, handleSave, handleInputChange
                                                                        }) => {
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>프로필 수정</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Floating>
            <Form.Control
              as="textarea"
              placeholder="Leave a comment here"
              id="workexperience"
              name="workexperience"
              style={{ height: '100px' }}
              onChange={handleInputChange}
            />
            <label htmlFor="workexperience">경력을 작성하세요.</label>
          </Form.Floating>
          <Form.Floating>
            <Form.Control
              as="textarea"
              placeholder="Leave a comment here"
              id="product"
              name="product"
              style={{ height: '100px' }}
              onChange={handleInputChange}
            />
            <label htmlFor="product">상품 또는 주분야를 작성하세요.</label>
          </Form.Floating>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>Close</Button>
        <Button variant="primary" onClick={handleSave}>Save Changes</Button>
      </Modal.Footer>
    </Modal>
  )
}

export const AdminExpertEditModal:React.FC<AdminExpertEditModalProps> = ({
                                                                   show, handleClose, handleSave, handleInputChange, editingUser, formData, publicProfile, editingProfile, handleProfileInputChange
}) => {
    const [nameBoolean, setNameBoolean] = useState(false);
    const [companyBoolean, setCompanyBoolean] = useState(false);

    const handleNameBoolean = () => {
        setNameBoolean(!nameBoolean);
    }

    const handleCompanyBoolean = () => {
        setCompanyBoolean(!companyBoolean);
    }

    return <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
            <Modal.Title>Edit User</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <Form>
                <Form.Group controlId="userName" className="mt-3">
                    <Form.Label>{editingUser?.username}</Form.Label>
                </Form.Group>
                <Form.Group controlId="userPassword" className="mt-3">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        type="password"
                        placeholder="Enter password"
                        name="password"
                        value={formData?.password}
                        onChange={handleInputChange}/>
                </Form.Group>
                {!nameBoolean && <Form.Group controlId="nameText" className="mt-3">
                    <Form.Label>Name : {formData?.name}</Form.Label>
                    <Form.Control
                        type={"button"}
                        value={"수정"}
                        onClick={handleNameBoolean}/>
                </Form.Group>}
                { nameBoolean && <Form.Group controlId="updateName" className="mt-3">
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder={editingUser?.name}
                        name="name"
                        value={formData?.name}
                        onChange={handleInputChange}/>
                </Form.Group>}
                { !companyBoolean && <Form.Group controlId="companyText" className="mt-3">
                    <Form.Label>Company : {formData?.company}</Form.Label>
                    <Form.Control
                        type={"button"}
                        value={"수정"}
                        onClick={handleCompanyBoolean}/>
                </Form.Group>}
                { companyBoolean &&  <Form.Group controlId="updateCompany" className="mt-3">
                    <Form.Label>Company</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder={editingUser?.company}
                        name="company"
                        value={formData?.company}
                        onChange={handleInputChange}/>
                </Form.Group>}
                <Form.Group controlId="phone" className="mt-3">
                    <Form.Label>Phone</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder={editingUser?.phone}
                        name="phone"
                        value={formData?.phone}
                        onChange={handleInputChange}/>
                </Form.Group>
            </Form>
            <hr/>
            <Form>
                <Form.Group controlId="workexperience" className="mt-3">
                    <Form.Label>workexperience</Form.Label>
                    <Form.Control
                        as={'textarea'}
                        placeholder={publicProfile?.workexperience}
                        name="workexperience"
                        value={editingProfile?.workexperience}
                        onChange={handleProfileInputChange}
                        rows={3}/>
                </Form.Group>
                <Form.Group controlId="companyaddr" className="mt-3">
                    <Form.Label>companyaddr</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder={publicProfile?.companyaddr}
                        name="companyaddr"
                        value={editingProfile?.companyaddr}
                        onChange={handleProfileInputChange}/>
                </Form.Group>
                <Form.Group controlId="product" className="mt-3">
                    <Form.Label>product</Form.Label>
                    <Form.Control
                        as={'textarea'}
                        placeholder={publicProfile?.product}
                        name="product"
                        value={editingProfile?.product}
                        onChange={handleProfileInputChange}
                    rows={3}/>
                </Form.Group>
                <Form.Group controlId="image" className="mt-3">
                    <Form.Label>image</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder={publicProfile?.image}
                        name="image"
                        value={editingProfile?.image}
                        onChange={handleProfileInputChange}/>
                </Form.Group>
            </Form>
        </Modal.Body>
        <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>Close</Button>
            <Button variant="primary" onClick={handleSave}>Save Changes</Button>
        </Modal.Footer>
    </Modal>;
}

export const ExpertEditModal:React.FC<ExpertEditModalProps> = ({
    show, handleClose, handleSave, handleInputChange, editingUser, formData
}) => {
    return <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
            <Modal.Title>Edit User</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <Form>
                <Form.Group controlId="userName" className="mt-3">
                    <Form.Label>{editingUser?.username}</Form.Label>
                </Form.Group>
                <Form.Group controlId="userPassword" className="mt-3">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        type="password"
                        placeholder="Enter password"
                        name="password"
                        value={formData?.password}
                        onChange={handleInputChange}/>
                </Form.Group>
                <Form.Group controlId="phone" className="mt-3">
                    <Form.Label>Phone</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter phone"
                        name="phone"
                        value={formData?.phone}
                        onChange={handleInputChange}/>
                </Form.Group>
            </Form>
        </Modal.Body>
        <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>Close</Button>
            <Button variant="primary" onClick={handleSave}>Save Changes</Button>
        </Modal.Footer>
    </Modal>;
}


// 전문가 - 공지 작성 모달
export const QuesWriteModal:React.FunctionComponent<AnnAndQuesWriteModalProps> = ({
                                                                                              show, handleClose, formData, handleInputChange, handleSave
                                                                                          }) => {
    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>문의작성</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group controlId="QuesWritetTitle" className="mt-3">
                        <Form.Control
                            type="text"
                            placeholder={formData?.title}
                            name="title"
                            onChange={handleInputChange}
                        />
                    </Form.Group>
                    <Form.Group controlId="QuesWriteTitle" className="mt-3">
                        <Form.Control
                            as="textarea"
                            placeholder={formData?.content}
                            name="content"
                            onChange={handleInputChange}
                            rows={5}
                        />
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>Close</Button>
                <Button variant="primary" onClick={handleSave}>Save Changes</Button>
            </Modal.Footer>
        </Modal>
    )
}

// 전문가 - 공지 수정 모달
export const QuesUpdateModal:React.FunctionComponent<AnnAndQuesWriteModalProps> = ({
                                                                                               show, handleClose, formData, handleInputChange, handleSave
                                                                                           }) => {
    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>문의수정</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group controlId="QuestTitle" className="mt-3">
                        <Form.Control
                            type="text"
                            placeholder={formData?.title}
                            name="title"
                            onChange={handleInputChange}
                        />
                    </Form.Group>
                    <Form.Group controlId="QuestTitle" className="mt-3">
                        <Form.Control
                            as="textarea"
                            placeholder={formData?.content}
                            name="content"
                            onChange={handleInputChange}
                            rows={5}
                        />
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>Close</Button>
                <Button variant="primary" onClick={handleSave}>Save Changes</Button>
            </Modal.Footer>
        </Modal>
    )
}