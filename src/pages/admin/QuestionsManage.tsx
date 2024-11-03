import React, {ChangeEvent, useEffect, useState} from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import {QuesBoardItem} from '../../components/forum/ForumItems.tsx';
import { ContentProps, QuestionsManageProps} from "../../components/user/props/AdminProps.ts";
import {axiosDelete, axiosGet, axiosPatch, axiosPost} from "../../util/axiosData.ts";
// import {fetchData} from "../../util/fetchData.ts";
import {CommentProps} from "../../components/forum/PropInterface.ts";
import {migHost} from "../../util/apiInof.ts";
import {useFindAll} from "../../hooks/useFindAll.ts";


export const QuestionsManage: React.FC = () => {

  const { forum, open , setOpen}= useFindAll()
  console.log(`forum`, forum)

  // 문의사항
  // const [forum, setForum] = useState<QuestionsManageProps[]>([]);
  const [selectQuestion, setSelectQuestion] = useState<QuestionsManageProps>();

  // 댓글
  const [comments, setComments] = useState<CommentProps[]>([]);
  const [commentWrite, setCommentWrite] = useState<Partial<ContentProps>>({});

  const cspfHost = migHost()
      // import.meta.env.VITE_DEV_CSPF_HOST;
  // const [open, setOpen] = useState<{[key:number]: boolean}>({});

  const handleGetInfo = (id:number) => {

    axiosGet(`${cspfHost}questions/${id}`).then(data => {
      setSelectQuestion(data?.data);
      axiosGet(`${cspfHost}comment/${id}/comments`).then(data => {
        {data?.data &&  setComments(data?.data);}
      })
    })

    setOpen(prevOpenItems => ({
      ...prevOpenItems,
      [id]: !prevOpenItems[id],
    }));
  }

 // const findAll = () => {
 //    axiosGet(`${cspfHost}questions`).then((data) => {
 //      const quesList = data?.data;
 //      console.log(quesList);
 //      setForum(quesList);
 //
 //      const initialOpenStates = quesList.reduce((acc: { [key: number]: boolean }, item: QuestionsManageProps) => {
 //        acc[item.id] = false;
 //        return acc;
 //      }, {});
 //
 //      setOpen(initialOpenStates);
 //    });
 //  }
 //
 //  useEffect(() => {
 //    findAll()
 //  }, [])

  const handleInputChange = (e : ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCommentWrite(prevData => ({
      ...prevData,
      [name]: value, // 입력 필드 이름에 맞춰 해당 값을 업데이트
    }));
  }

  const handleCommentSave = (id: number) => {
      axiosPost(`${cspfHost}comment/${id}`,commentWrite).then(data => {
        console.log(data);
      })
    setCommentWrite({});
  }

  const commentModifyAndDelete = (id: number, type: string) => {
    // @ts-ignore
    const {contentModify} = commentWrite;
    if(type==='Modify' && contentModify){
      axiosPatch(`${cspfHost}comment/${id}`, {content:contentModify}).then(data => {
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
  return (
    <Container>
      <Row>
        <Col lg={12}>
          <div className="wrapper wrapper-content animated fadeInRight">
            <div className="ibox-content forum-container">
              {/* forum 배열을 map으로 순회하여 항목들을 렌더링 */}
              {forum.map((item) => (
                <QuesBoardItem key={item.id} id={item.id} title={item.title} content={selectQuestion?.content} authorCode={item.authorCode}
                               createdAt={item.createdAt} handleGetInfo={handleGetInfo} open={open[item.id]} userType={'admin'} comments={comments}
                handleInputChange={handleInputChange} handleSave={handleCommentSave} commentModifyAndDelete={commentModifyAndDelete}/>
              ))}
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  );
};
