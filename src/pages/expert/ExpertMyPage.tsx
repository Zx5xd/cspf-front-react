import React, { useEffect, useState } from 'react';
import '../../style/wrapper.css';
import {  EditPassModalProps } from '../../components/user/props/UserProps.ts';
import { fetchData, putFetch } from '../../util/fetchData.ts';
import {DetailProfileSetModal, EditPassModal, ExpertEditModal} from '../../components/user/Modal.tsx';
import {PublicProfile} from "./Mypage/PublicProfile.tsx";
import {PrivateProfile} from "./Mypage/PrivateProfile.tsx";
import {ChatManage} from "./Mypage/ChatMange.tsx";
import {Booking} from "./Mypage/Booking.tsx";
import {Availability} from "./Mypage/Availability.tsx";
import {ExpertEntity, ExpertPublicEntity} from "../../components/user/props/ExpertProps.ts";
import {migHost} from "../../util/apiInof.ts";
import {axiosGet, axiosPatch} from "../../util/axiosData.ts";
import {setCookie} from "../../util/cookie.ts";

export const ExpertMyPage: React.FC = () => {

  // 마이페이지
  const [users, setUsers] = useState<ExpertEntity>();

  // 계정 정보 수정
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState<Partial<ExpertEntity>>({});

  // 계정 비밀번호 수정
  const [showPwdModal, setShowPwdModal] = useState(false);
  const [editPwdData, setEditPwdData] = useState<Partial<EditPassModalProps>>({});

  // 전문가 추가 프로필
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [detailProfile, setDetailProfile] = useState<Partial<ExpertPublicEntity>>({});


  useEffect(() => {
    axiosGet(`${migHost()}expert`).then((user)=>{
      setUsers(user?.data)
    })
  }, []);

  // 모달 닫기
  const handleClose = () => {
    setShowModal(false);
    setShowPwdModal(false);
    setFormData({}); // 폼 데이터 초기화
  };

  const handlePwdClose = () => {
    setShowPwdModal(false);
    setEditPwdData({});
  };

  const handleDetailModalClose = () => {
    setShowDetailModal(false);
    setDetailProfile({});
  };

  const handleEdit = () => {
    setShowModal(true);
  };

  // 폼 데이터 변경 처리
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handlePwdInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEditPwdData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleDetailProfileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setDetailProfile((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // 유저 수정 저장 처리
  const handleSave = async () => {

     try {
       console.log(`user Save `, formData)
       await axiosPatch(`${migHost()}expert/${users?.expertCode}`, JSON.stringify(formData)).then((res) => {
          if (res && res.status === 200) {
           users === res.data ? alert('업데이트 에러...') : (
               setUsers(res.data),
               setCookie('profile',res.data),
               setShowModal(false)
           )
         }
        }).catch(res => console.log(res));
      } catch (error) {console.log(error)}
  }

  const handleDetailProfileSave = () => {
    console.log(detailProfile);
    setShowDetailModal(false);
  };

  const handleSetDetailProfile = () => {
    setShowDetailModal(true);
  };

  const handleSetPassword = () => {
    const handleSetUsercode = formData.expertCode;
    setEditPwdData({ pwd1: '', pwd2: '', userCode: handleSetUsercode });
    setShowPwdModal(true);
  };

  const ChckToRequestChat = () => {
    console.log('ChckToRequestChat');
  };


  return (


    <><><>
      <div className="tab-content">
        {/* Account Tab */}
        <div className="tab-pane fade show active" id="account" role="tabpanel">
          {/*공개프로필*/}
       <PublicProfile
           expertData = {formData}
          expertPublicData = {detailProfile}
          handleSetDetailProfile={handleSetDetailProfile}/>
{/*개인정보*/}
         <PrivateProfile
         expertData = {formData}
         handleEdit = {handleEdit}
         handleSetPassword = {handleSetPassword}
         />
{/*채팅관리*/}
          <ChatManage
              ChckToRequestChat={ChckToRequestChat}/>
          {/*예약신청 내역*/}
          <Booking/>
          {/*예약관리*/}
          <Availability/>
        </div>
      </div>
      <ExpertEditModal
        show={showModal}
        handleClose={handleClose}
        handleSave={handleSave}
        formData={formData}
        handleInputChange={handleInputChange}
        editingUser={users} /></>

      <EditPassModal
        show={showPwdModal}
        handleClose={handlePwdClose}
        handleSave={handleSave}
        formData={editPwdData}
        handleInputChange={handlePwdInputChange} /></>

      <DetailProfileSetModal show={showDetailModal} handleClose={handleDetailModalClose}
                             handleSave={handleDetailProfileSave} formData={detailProfile}
                             handleInputChange={handleDetailProfileInputChange} /></>

  );
}