import React, {ChangeEvent, useEffect, useState} from 'react';
import {Button, Card, Col, Collapse, Container, Row} from 'react-bootstrap';
import {QuesBoardItem} from '../../components/forum/ForumItems.tsx';
import {ContentProps, QuestionsManageProps} from "../../components/user/props/AdminProps.ts";
import Pagination from "react-js-pagination";
import {
  QuesUpdateModal,
  QuesWriteModal
} from "../../components/user/Modal.tsx";
import {axiosDelete, axiosGet, axiosPatch, axiosPost} from "../../util/axiosData.ts";
import {CommentProps} from "../../components/forum/PropInterface.ts";
import {migHost} from "../../util/apiInof.ts";


export const Questions: React.FC = () => {

  // 문의사항
  const [forum, setForum] = useState<QuestionsManageProps[]>([]);
  const [selectQuestion, setSelectQuestion] = useState<QuestionsManageProps>();
  const [writeQuestion, setWriteQuestion] = useState<Partial<QuestionsManageProps>>({});

  // 댓글
  const [comments, setComments] = useState<CommentProps[]>([]);
  const [commentWrite, setCommentWrite] = useState<Partial<ContentProps>>({});

  // 게시글 확인
  const [open, setOpen] = useState<{[key:number]: boolean}>({});

  // Modal OpenStatus
  const [showModal, setShowModal] = useState(false);
  const [editShowModal, setEditShowModal] = useState(false);

  // 페이지, 게시글 수
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(20);
  let pageLimit = 20;

  const handleGetInfo = (id:number) => {

    axiosGet(`${migHost()}questions/${id}`).then(data => {
      setSelectQuestion(data?.data);
      axiosGet(`${migHost()}comment/${id}/comments`).then(data => {
        {data?.data &&  setComments(data?.data);}
      })
    })

    setOpen(prevOpenItems => ({
      ...prevOpenItems,
      [id]: !prevOpenItems[id],
    }));
  }

  const findAll = () => {
    axiosGet(`${migHost()}questions`).then((data) => {
      const quesList = data?.data;
      console.log(quesList);
      setForum(quesList);

      const initialOpenStates = quesList.reduce((acc: { [key: number]: boolean }, item: QuestionsManageProps) => {
        acc[item.id] = false;
        return acc;
      }, {});

      setOpen(initialOpenStates);
    });
  }

  useEffect(() => {
    findAll()
  }, [page, showModal, editShowModal])

  const handleWriteQues = () => {
    setShowModal(true); // 모달 열기
  }

  const handleClose = () => {
    setShowModal(false);
    setEditShowModal(false);
    setWriteQuestion({}); // 폼 데이터 초기화
  };

  const handleCommentInputChange = (e : ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCommentWrite(prevData => ({
      ...prevData,
      [name]: value, // 입력 필드 이름에 맞춰 해당 값을 업데이트
    }));
  }

  const handleQuesInputChange = (e : ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setWriteQuestion(prevData => ({
      ...prevData,
      [name]: value, // 입력 필드 이름에 맞춰 해당 값을 업데이트
    }));
  }

  const handleCommentSave = (id: number) => {
    axiosPost(`${migHost()}comment/${id}`,commentWrite).then(data => {
      console.log(data);
    })
    setCommentWrite({});
  }

  const commentModifyAndDelete = (id: number, type: string) => {
    // @ts-ignore
    const {contentModify} = commentWrite;
    if(type==='Modify' && contentModify){
      axiosPatch(`${migHost()}comment/${id}`, {content:contentModify}).then(data => {
        console.log(data);
      })
    }
    if(type==='Delete'){
      // @ts-ignore
      axiosDelete(`${cspfHost}comment/${id}`).then(data => {
        console.log(data);
      })
    }
  }

  const handleUpdateBoard = (id:number) => {
    setWriteQuestion(prevData => ({
      ...prevData,
      id: id,
    }))
    setEditShowModal(!editShowModal);
  }

  // 문의사항 업데이트
  const handleUpdateSave = () => {
      console.log(writeQuestion);
    writeQuestion && axiosPatch(migHost()+`questions/${writeQuestion.id}`,writeQuestion).then(data=>{
      console.log(data);
      setEditShowModal(false);
      setWriteQuestion({}); // 폼 데이터 초기화
    })
  }

  // 문의사항 등록
  const handleSave = async () => {
    console.log(writeQuestion);
    axiosPost(migHost()+'questions',JSON.stringify(writeQuestion)).then(data => {
      console.log(data);
      setShowModal(false);
      setWriteQuestion({}); // 폼 데이터 초기화
    })
  };

  const handlePageChange = (page: number) => {
    setPage(page);
    setLimit(page*20);
  }



  return (
      <Container>
        <Row>
          <Col lg={12}>
            <div className="wrapper wrapper-content animated fadeInRight">
              <div className="ibox-content forum-container position-relative">
                {/* forum 배열을 map으로 순회하여 항목들을 렌더링 */}
                {forum.map((item) => (
                    <QuesBoardItem key={item.id} id={item.id} title={item.title} content={selectQuestion?.content}
                                   authorCode={item.authorCode} handleUpdateBaord={handleUpdateBoard}
                                   createdAt={item.createdAt} handleGetInfo={handleGetInfo} open={open[item.id]}
                                   userType={'admin'} comments={comments}
                                   handleInputChange={handleCommentInputChange} handleSave={handleCommentSave}
                                   commentModifyAndDelete={commentModifyAndDelete}/>
                ))}
                <div className="position-absolute top-90 end-0"><Button onClick={handleWriteQues}>문의 작성</Button>
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
                  <QuesWriteModal
                      show={showModal}
                      handleClose={handleClose}
                      handleInputChange={handleQuesInputChange}
                      handleSave={handleSave}
                  />

                  <QuesUpdateModal
                      show={editShowModal}
                      handleClose={handleClose}
                      formData={selectQuestion}
                      handleInputChange={handleQuesInputChange}
                      handleSave={handleUpdateSave}
                  />
                </div>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
  );
};
