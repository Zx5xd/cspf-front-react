import React, { useEffect, useState } from 'react';
import {ExperttableItem, } from '../../components/user/UserInfoTable.tsx';
import {AdminExpertEditModal, } from '../../components/user/Modal.tsx';
import {ExpertEntity, ExpertPublicEntity} from "../../components/user/props/ExpertProps.ts";
import {axiosPatch, axiosPost} from "../../util/axiosData.ts";
import {migHost} from "../../util/apiInof.ts";

export const ExpertManage:React.FC = () => {

  const [users, setUsers] = useState<ExpertEntity[]>();
  const [profiles, setProfiles] = useState<ExpertPublicEntity[]>();

  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState<boolean>(true); // 로딩 상태
  const [editingUser, setEditingUser] = useState<ExpertEntity | null>(null); // 수정할 유저 상태
  const [formData, setFormData] = useState<Partial<ExpertEntity | null>>(null); // 폼 데이터
  const [publicProfile, setPublicProfile] = useState<ExpertPublicEntity | null>(null);
  const [editProfile, setEditProfile] = useState<Partial<ExpertPublicEntity | null>>(null);

  const localHost = migHost()
  //import.meta.env.VITE_LOCAL_HOST;

  // 백엔드에서 데이터를 가져오는 함수
  const fetchUsers = async () => {
    setUsers([])
    setProfiles([])

    try {
      await fetch(`${localHost}expert/findAll`).then(async data => {
        setUsers(await data.json());
      }); // API 요청
      await fetch(`${localHost}expertProfile`).then(async data => {
        setProfiles(await data.json());
      })
      setLoading(false); // 로딩 완료
    } catch (error) {
      console.error('Error fetching users:', error);
      setLoading(false);
    }
  };

  // 컴포넌트가 처음 마운트될 때 유저 데이터를 가져옴
  useEffect(() => {
    if(!showModal){
      console.log(showModal)
      fetchUsers()
    }
  }, [showModal]);

  // 모달 닫기
  const handleClose = () => {
    setShowModal(false);
    setEditingUser(null); // 모달 닫을 때 수정 상태 초기화
    setFormData(null); // 폼 데이터 초기화
  };

  // 사용자 삭제
  const handleDelete = async (expertCode: string) => {
    try {
      await fetch(`${localHost}expert/${expertCode}`, {
        method: 'DELETE',
      });
      setUsers(users?.filter(user => user.expertCode !== expertCode)); // 삭제 후 상태 업데이트
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  const handleEdit = async (user: ExpertEntity) => {
    setEditingUser(user); // 수정할 유저 데이터 설정
    setFormData(null); // 폼에 유저 데이터 미리 채워넣음

    profiles && profiles.map((profile) => {
      console.log(profile)
      if(user.expertCode === profile.id)
      {setPublicProfile(profile)}else{
        setPublicProfile(null)}
    })

    setEditProfile(prevData => ({
      ...prevData,
      expertCode: user
    }));

    setShowModal(true); // 모달 열기
  }

  // 폼 데이터 변경 처리
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormData(prevData => ({
      ...prevData,
      [name]: value, // 입력 필드 이름에 맞춰 해당 값을 업데이트
    }));
  };

  const handleProfileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setEditProfile(prevData => ({
      ...prevData,
      [name]: value, // 입력 필드 이름에 맞춰 해당 값을 업데이트
    }));
  };

  // 유저 수정 저장 처리
  const handleSave = async () => {
    console.log(formData);
    console.log(editProfile)

   formData && axiosPatch(`${localHost}expert/${editingUser?.expertCode}`,formData).then(data => {
      console.log(data?.status);
    })

    // formData && axios.patch(`${localHost}expert/${editingUser?.expertCode}`,formData,{
    //   headers: {
    //     'Content-Type': 'application/json'
    //   },
    //   withCredentials: true
    // }).then(data => {
    //   console.log(data.status);
    // })

    editProfile && axiosPost(`${localHost}expertProfile`,editProfile).then(data => {
      console.log(data?.status);
    })

    setShowModal(false);

    // editProfile && axios.post(`${localHost}expertProfile`,editProfile,{
    //   headers: {
    //     'Content-Type': 'application/json'
    //   },
    //   withCredentials: true
    // }).then(data => {
    //   console.log(data);
    // })
  };


  return (
    <div>
      {/* 로딩 중일 때 메시지 표시 */}
      {loading ? (
        <p>Loading users...</p>
      ) : (<>
          {users?.map((user) => (
            <ExperttableItem
              key={user.expertCode} // 각 항목에 key 추가
              expert={user}
              email={user.email}
              name={user.name}
              handleEdit={handleEdit}
              handleDelete={handleDelete}
              user={user}
            />
          ))}
        </>
      )}

      {/* 유저 수정 모달 */}
      <AdminExpertEditModal
        show={showModal}
        handleClose={handleClose}
        handleSave={handleSave}
        formData={formData}
        handleInputChange={handleInputChange}
        handleProfileInputChange={handleProfileInputChange}
        editingUser={editingUser}
        editingProfile={editProfile}
        publicProfile={publicProfile}
      />
    </div>
  );
}