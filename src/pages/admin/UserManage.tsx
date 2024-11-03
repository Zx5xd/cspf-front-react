import { useEffect, useState } from 'react';
import { UserProps } from '../../components/user/props/UserProps.ts';
import { UsertableItem } from '../../components/user/UserInfoTable.tsx';
import { UserEditModal } from '../../components/user/Modal.tsx';
import { fetchData,  putFetch } from '../../util/fetchData.ts';
import {migHost} from "../../util/apiInof.ts";


export const UserManage:React.FC = () => {

  const [users, setUsers] = useState<UserProps[] | null>();
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState<boolean>(true); // 로딩 상태
  const [editingUser, setEditingUser] = useState<UserProps | null>(null); // 수정할 유저 상태
  const [formData, setFormData] = useState<Partial<UserProps>>({}); // 폼 데이터
  const cspfHost = migHost()
      //import.meta.env.VITE_DEV_CSPF_HOST;

  // 백엔드에서 데이터를 가져오는 함수


  // const fetchUsers = async () => {
  //   try {
  //     const response = await fetch('http://cspf.kro.kr:50952/user'); // API 요청
  //     const data = await response.json();
  //     setUsers(data); // 서버에서 받은 유저 데이터로 상태 업데이트
  //     setLoading(false); // 로딩 완료
  //   } catch (error) {
  //     console.error('Error fetching users:', error);
  //     setLoading(false);
  //   }
  // };

  // 컴포넌트가 처음 마운트될 때 유저 데이터를 가져옴
  useEffect(() => {
    fetchData(cspfHost + 'user').then(data =>{
      setUsers(data);
      setLoading(false);
    }).catch(error => {console.log(error);setLoading(false);});
  }, [showModal]);

  // 모달 닫기
  const handleClose = () => {
    setShowModal(false);
    setEditingUser(null); // 모달 닫을 때 수정 상태 초기화
    setFormData({}); // 폼 데이터 초기화
  };

  // 사용자 삭제
  const handleDelete = async (userCode: string) => {
    try {
      await fetch(cspfHost+`user`, {
        method: 'DELETE',
        body:{
          userCode: userCode
        }
      }).then(data => {
        console.log(data);
      });
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      setUsers(users.filter(user => user.userCode !== userCode)); // 삭제 후 상태 업데이트
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  const handleEdit = async (user: UserProps) => {
    if(user.userCode.trim().length > 0){
      setEditingUser(user); // 수정할 유저 데이터 설정
      setFormData(user); // 폼에 유저 데이터 미리 채워넣음
    }
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

  // 유저 수정 저장 처리
  const handleSave = async () => {
    console.log(formData);
    if (editingUser) {


      
      putFetch(`${cspfHost}user/${editingUser.userCode}`,JSON.stringify(formData)).then(data=>{
        console.log(data);
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        setUsers(users.map(user => (user.userCode === editingUser.userCode ? { ...user, ...formData } : user)));
        setShowModal(false); // 모달 닫기
        setEditingUser(null); // 수정 상태 초기화
      })

      // try {
      //   const response = await fetch(`http://cspf.kro.kr:50952/users/${editingUser.userCode}`, {
      //     method: 'PUT',
      //     headers: {
      //       'Content-Type': 'application/json',
      //     },
      //     body: JSON.stringify(formData),
      //   });
      //
      //   if (response.ok) {
      //     // 성공적으로 수정되면 유저 목록 상태 업데이트
      //     setUsers(users.map(user => (user.userCode === editingUser.userCode ? { ...user, ...formData } : user)));
      //     setShowModal(false); // 모달 닫기
      //     setEditingUser(null); // 수정 상태 초기화
      //   }
      // } catch (error) {
      //   console.error('Error updating user:', error);
      // }
    }
  };

  const handleCheck = (e: React.ChangeEvent<HTMLInputElement>) =>{
    setFormData(prevData => ({
      ...prevData,
      petOwnership: e.target.checked ? 'true' : 'false', // 체크 상태에 따라 true/false 값 설정
    }))
  };


  return (
    <div>
      {/* 로딩 중일 때 메시지 표시 */}
      {loading ? (
        <p>Loading users...</p>
      ) : (<>
        {users?.map((user) => (
            <UsertableItem
              key={user.userCode} // 각 항목에 key 추가
              userCode={user.userCode}
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
    <UserEditModal
      show={showModal}
    handleClose={handleClose}
    handleSave={handleSave}
    formData={formData}
    handleInputChange={handleInputChange}
    handleCheck={handleCheck}
    editingUser={editingUser}
    />
    </div>
  );
}