import React, {useEffect, useState} from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import {AnnounBoardItem, BoardItem} from '../../components/forum/ForumItems.tsx';
import {fetchData} from "../../util/fetchData.ts";
import {axiosGet} from "../../util/axiosData.ts";
import {migHost} from "../../util/apiInof.ts";

interface pageFilter{
  page: number;
  limit: number;
}

interface AnnounceManageProps {
  id: number;
  title: string;
  content: string;
  createdAt: string;
}

export const Announcement: React.FC = () => {

  const host = migHost()
      // import.meta.env.VITE_DEV_CSPF_HOST;
  const [pageFilter, setPageFilter] = useState<pageFilter>({
    page: 1,
    limit: 20,
  });
  const [forum, setForum] = useState<AnnounceManageProps[]>([]);
  const [open, setOpen] = useState<{[key:number]: boolean}>({});


  const handleGetInfo = (id:number) => {
    console.log(open[id]);
    setOpen(prevOpenItems => ({
      ...prevOpenItems,
      [id]: !prevOpenItems[id],
    }));
  }
  useEffect(() => {
    axiosGet(`${host}announcement/pages`,pageFilter).then(data => {
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
  }, [host, pageFilter]);


  return (
    <Container>
      <Row>
        <Col lg={12}>
          <div className="wrapper wrapper-content animated fadeInRight">
            <div className="ibox-content forum-container">
              {/* forum 배열을 map으로 순회하여 항목들을 렌더링 */}
              {forum.map((item) => (
                <AnnounBoardItem key={item.id} id={item.id} content={item.content} createdAt={item.createdAt} title={item.title}
                 handleGetInfo={handleGetInfo} open={open[item.id]} userType={'user'}/>
              ))}
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  );
};
