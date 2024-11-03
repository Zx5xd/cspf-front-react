import React, {useEffect, useState} from 'react';
import { Button, Col, Container, Row } from 'react-bootstrap';
import {AnnounBoardItem} from '../../components/forum/ForumItems.tsx';
import {AnnounceManageProps, ContentProps} from '../../components/user/props/AdminProps.ts';
import {AdminAnnounUpdateModal, AdminAnnounWriteModal} from '../../components/user/Modal.tsx';
import Pagination from "react-js-pagination";
import {axiosDelete, axiosGet, axiosPatch, axiosPost} from "../../util/axiosData.ts";
import {migHost} from "../../util/apiInof.ts";


export const AnnounceManage: React.FC = () => {

  const [formData, setFormData] = useState<Partial<AnnounceManageProps>>({});
  const [contentData, setContentData] = useState<Partial<ContentProps>>({});
  const [showModal, setShowModal] = useState(false);
  const [editShowModal, setEditShowModal] = useState(false);
  // const cspfHost = import.meta.env.VITE_CSPF_HOST;
  const [page, setPage] = useState(1);
  let limit = 20;

  const cspfHost = migHost()
      //import.meta.env.VITE_DEV_CSPF_HOST;
  const [open, setOpen] = useState<{[key:number]: boolean}>({});
  const [deleteResult, setDeleteResult] = useState(false);
  const [forum, setForum] = useState<AnnounceManageProps[]>([]);

  useEffect(() => {
    try{
      axiosGet(`${migHost()}announcement/pages?page=${page}&limit=${limit}`).then(data => {
        const fetchedForum = data?.data.data;
        setForum(fetchedForum);
        // data.data{
        //   currentPage,
        //       data,
        //       totalItems,
        //       totalPages
        // }
        // 모든 항목의 open 상태를 false로 설정

        console.log(fetchedForum);

        const initialOpenStates = fetchedForum.reduce((acc: { [key: number]: boolean }, item: AnnounceManageProps) => {
          acc[item.id] = false;
          return acc;
        }, {});
        setOpen(initialOpenStates);
    })
    } catch (err) {
      console.log(err);
    }


  }, [page, showModal, editShowModal, deleteResult]);


  const handleGetInfo = (id : number) =>{
    setOpen(prevOpenItems => ({
      ...prevOpenItems,
      [id]: !prevOpenItems[id],
    }));
  }

  const handleUpdateBoard = (id: number) => {
    forum.map((item)=>{
      if(item.id === id) {
        setFormData(item);
        setContentData({title: item.title})
      }
    })

    setEditShowModal(!editShowModal);
  }

  const handleWriteAnnoun = () => {
    setShowModal(true); // 모달 열기
  }

  const handleClose = () => {
    setShowModal(false);
    setEditShowModal(false);
    setContentData({}); // 폼 데이터 초기화
    setFormData({})
  };

  // 폼 데이터 변경 처리
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setContentData(prevData => ({
      ...prevData,
      [name]: value, // 입력 필드 이름에 맞춰 해당 값을 업데이트
    }));
  };

  const handleUpdateSave = () => {
    console.log(contentData);
    console.log(formData);

    contentData && axiosPatch(cspfHost+`announcement/${formData.id}`,contentData).then(data=>{
      setEditShowModal(false);
      setContentData({}); // 폼 데이터 초기화
      setFormData({})
    })
  }

  // 유저 수정 저장 처리
  const handleSave = async () => {

    axiosPost(cspfHost+'announcement',JSON.stringify(contentData)).then(data => {
      console.log(data);
      setShowModal(false);
      setContentData({}); // 폼 데이터 초기화
      setFormData({})
    })
  };

  const handleDeleteBaord = (id:number) => {
    // @ts-ignore
    axiosDelete(`${cspfHost}announcement/${id}`).then(data => {
      if(data.data.message !== null)
          setDeleteResult(!deleteResult)
    })
  }

  const handlePageChange = (page: number) => {
    console.log(page, limit*page);
    setPage(page);
  }


  return (
      <Container>
        <div className="wrapper wrapper-content animated fadeInRight">

            <Row>
              <Col lg={12}>
                <div className="ibox-content forum-container position-relative" style={{width:'70vh'}}>
                  {/* forum 배열을 map으로 순회하여 항목들을 렌더링 */}
                  {forum.map((item) => (
                      <AnnounBoardItem key={item.id} id={item.id} content={item.content} title={item.title} createdAt={item.createdAt} authorCode={item.admin} open={open[item.id]} handleGetInfo={handleGetInfo} handleUpdateBaord={handleUpdateBoard} handleDeleteBaord={handleDeleteBaord} userType={'admin'}/>
                  ))}
                  <div className="position-absolute top-90 end-0"><Button onClick={handleWriteAnnoun}>글 작성</Button>
                  </div>
                  <div className={'position-absolute end-50 top-80'}>
                    <Pagination
                        activePage={page} // 현재 페이지
                        itemsCountPerPage={10} // 한 페이지랑 보여줄 아이템 갯수
                        totalItemsCount={450} // 총 아이템 갯수
                        pageRangeDisplayed={5} // paginator의 페이지 범위
                        prevPageText={"‹"} // "이전"을 나타낼 텍스트
                        nextPageText={"›"} // "다음"을 나타낼 텍스트
                        onChange={handlePageChange} // 페이지 변경을 핸들링하는 함수
                    />
                  </div>
                  <AdminAnnounWriteModal
                      show={showModal}
                      handleClose={handleClose}
                      formData={contentData}
                      handleInputChange={handleInputChange}
                      handleSave={handleSave}
                  />

                  <AdminAnnounUpdateModal
                    show={editShowModal}
                    handleClose={handleClose}
                    formData={formData}
                    handleInputChange={handleInputChange}
                    handleSave={handleUpdateSave}
                    />

                </div>
              </Col>
            </Row>
          <Row>
            <Col lg={12}>

  </Col>
</Row>

        </div>



</Container>
)
  ;
};
