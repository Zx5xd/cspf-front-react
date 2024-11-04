import React, {ChangeEvent, useEffect} from "react";
import { useState } from "react";
import {Button, Card, Col, Dropdown, Form, Image, Row} from 'react-bootstrap';
import { Collapse } from "react-bootstrap";
// import {CCollapse} from "@coreui/react";
import {TagRemove} from "../../util/tagRemove";
import {fetchUrl} from "../../util/fetchData";
import {urlProp, AniInfoProps, ForumItemProps, BoardItemProps, CommentProps} from './PropInterface';
import {convertToKoreanTime} from "../../util/convertDate.ts";
import {axiosPost} from "../../util/axiosData.ts";
import useEnterKey from "@/hooks/useEnterKey.ts";

const SendUrl: React.FC<urlProp> = ({url}) => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    console.log(`SendUrl: ${url}`);
    const [content, setContent] = useState<string>('');
    const [author, setAuthor] = useState<string>('');

    const jsonURL = {
        "url" : url
    }

    const host = import.meta.env.VITE_LOCAL_HOST || 'localhost';
    const hostUrl = host+"scrip/news";
    console.log('hostUrl', hostUrl);

    useEffect(() => {
            const getContent = async (): Promise<any> => {
                await fetchUrl(hostUrl, JSON.stringify(jsonURL)).then(data => {
                    const parseJSON = JSON.parse(data);
                    setAuthor(parseJSON[0].news_author);
                    setContent(parseJSON[1].news_contents);
                });

            };

            getContent();
        },
        [url]);

    return (
        <><p>{author}</p><p style={{whiteSpace: 'pre-wrap'}}>
            {content}
        </p></>
    );
}

export const NewsForumItem: React.FC<ForumItemProps> = ({ title, link, description, pubDate, types }) => {
    console.log(`Forum, Title=${title},\n link = ${link},\n desc=${description},\n pubDate=${pubDate},\n types=${types}`);
    const [open, setOpen] = useState(false);

    console.log(`NewsForumItem 진입`);
    return (
        <div className="forum-item">
            <Row>
                <Col md={9} sm={10}>
                    <a href='#' className="forum-item-title" onClick={(event) => { event.preventDefault(); setOpen(!open);}}>{TagRemove(title)}</a>
                    <div className="forum-sub-title">{TagRemove(description)}</div>
                </Col>
                <Col md={3} className="forum-info">
                    <span className="views-number">{pubDate}</span>
                    <div><small>{types}</small></div>
                </Col>
            </Row>
            <Row>
                <Col>
                    <Collapse in={open}>
                        <div className="forum-item-content">
                            {open && <SendUrl url={link}/>}
                        </div>
                    </Collapse>
                </Col>
            </Row>
        </div>
    );
}

export const LawsForumItem: React.FC<ForumItemProps> = ({ title, link, description, pubDate, types }) => {
    // console.log(`Forum, Title=${title},\n link = ${link},\n desc=${description},\n pubDate=${pubDate},\n types=${types}`);
    return (
        <div className="forum-item">
            <Row>
                <Col md={9} sm={10}>
                    <a href={link} className="forum-item-title">{TagRemove(title)}</a>
                    <div className="forum-sub-title">{TagRemove(description)}</div>
                </Col>
                <Col md={2} className="forum-info">
                    <span className="views-number">{pubDate}</span>
                    <div><small>{types}</small></div>
                </Col>
            </Row>
        </div>
    );
}

export const AniInfo: React.FC<AniInfoProps> = ({ dogRegNo, dogNm, sexNm, kindNm, neuterYn }) => {
    console.log(`ForumItems, Title=${dogRegNo},\n link = ${dogNm},\n desc=${sexNm},\n pubDate=${kindNm},\n types=${neuterYn}`);
    return (
        <div className="forum-item">
            <Row>
                <Col md={9} sm={10}>
                    <p className="forum-item-title">{TagRemove(dogRegNo)}</p>
                    <div className="forum-sub-title">{TagRemove(dogNm)}</div>
                </Col>
                <Col md={2} className="forum-info">
                    <span className="views-number">{sexNm}</span>
                    <div><small>{kindNm}</small></div>
                    <p>{neuterYn}</p>
                </Col>
            </Row>
        </div>
    );
}

export const AnnounBoardItem: React.FC<BoardItemProps> = ({
    id, authorCode, title, content, createdAt,  open, handleGetInfo, handleUpdateBaord, userType, handleDeleteBaord
}) => {



    return (<div key={id} className="forum-item" style={{width:'100%'}}>
        <Row>
            {userType === 'admin' ?
                (
                    <><Col md={1} sm={1}>
                        <div className="views-number">{id}</div>
                    </Col><Col md={6} sm={11}>
                        <div className="forum-sub-title" style={{width: '10rem'}}>
                            <a href={'#'} onClick={(event) => {
                                event.preventDefault();
                                handleGetInfo(id);
                            }}>  {TagRemove(title)} </a>
                        </div>
                    </Col><Col md={2} className="forum-info">
                        <span className="views-number">{authorCode}</span>
                        <div className={'text-wrap;'} style={{width: '6rem'}}><small>{convertToKoreanTime(createdAt)}</small></div>
                    </Col><Col md={3}>
                       <Button variant="dark" onClick={() => handleUpdateBaord(id)} className="me-2 mb-2">수정</Button>
                       <Button variant="light" onClick={() => handleDeleteBaord(id)} className="me-2 mb-2">삭제</Button>
                    </Col></>
                ):(
                    <><Col md={1} sm={1}>
                        <div className="views-number">{authorCode}</div>
                    </Col><Col md={6} sm={11}>
                        <div className="forum-sub-title" style={{minWidth: '10rem'}}>
                            <a href={'#'} onClick={(event) => {
                                event.preventDefault();
                                handleGetInfo(id);
                            }}>  {TagRemove(title)} </a>
                        </div>
                    </Col><Col md={2} className="forum-info">
                        <span className="views-number">{id}</span>
                        <div className={'text-wrap;'} style={{width: '7rem'}}><small>{convertToKoreanTime(createdAt)}</small></div>
                    </Col></> )}
        </Row>
        <Collapse in={open}>
            <div id="example-collapse-text">
                <Card body>
                    {content}
                </Card>
            </div>
        </Collapse>
    </div>)

}

export const QuesBoardItem: React.FC<BoardItemProps> = ({
                                                              id, authorCode, title, content, createdAt,  open, handleGetInfo, handleSave, handleInputChange, comments, commentModifyAndDelete, handleUpdateBaord
                                                          }) => {

    const { handleKeyDown } =useEnterKey(() => {handleSave(id)})

    return (<div key={id} className="forum-item" style={{width:'100%'}}>
        <Row>
            <Col md={1}>
                <div className="views-number">{authorCode}</div>
            </Col>
            <Col md={6}>
                <div className="forum-sub-title" style={{ minWidth: '10rem' }}>
                    <a href={'#'} onClick={(event) => { event.preventDefault(); handleGetInfo(id); }}>  {TagRemove(title)} </a>
                </div>
            </Col>
            <Col md={4} className="forum-info">
                <span className="views-number">{id}</span>
                <div className={'text-wrap;'} style={{ width: '7rem' }}><small>{convertToKoreanTime(createdAt)}</small></div>
            </Col>
            <Col md={1}>
                <Dropdown>
                    <Dropdown.Toggle variant="outline-dark" id="dropdownMenuLink">
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                        <Dropdown.Item onClick={() => handleUpdateBaord(id)}>수정</Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
            </Col>
        </Row>
        <Collapse in={open}>
            <div id="example-collapse-text">
                <Card body>
                    <p className={'mb-5'}>{content}</p>
                    <Form className="mb-4">
                        <Form.Control
                            as="textarea"
                            name={'content'}
                            rows={3}
                            onChange={handleInputChange}
                            onKeyDown={handleKeyDown}
                            placeholder="답변해주세요!"
                        />
                        <Form.Control
                            type={"button"}
                            value={"전송"}
                            onClick={() => handleSave(id)}
                        />
                    </Form>
                    { comments.map((comment) => (
                        <CommentItem boardId={comment.boardId} content={comment.content}  authorCode={comment.authorCode} createdAt={comment.createdAt} id={comment.id} key={comment.id}
                        handleInputChange={handleInputChange} commentModifyAndDelete={commentModifyAndDelete}/>
                    ))}
                </Card>
            </div>
        </Collapse>
    </div>
    )
}

export const CommentItem: React.FC<CommentProps> = ({
    id, authorCode, createdAt, content, commentModifyAndDelete, handleInputChange,
                                                    }) => {

    const [open, setOpen] = useState(false);
    const commentUpdate = () => {
        setOpen(!open);
    }
    const {handleKeyDown} = useEnterKey(() => commentModifyAndDelete(id, "Modify"))

    return (
        <section className="mb-1">
                    {/*/!* Comment with nested comments *!/*/}
                    {/*<div className="d-flex mb-4">*/}
                    {/*    /!* Parent comment *!/*/}
                    {/*    <div className="ms-3">*/}
                    {/*        <div className="fw-bold">Commenter Name</div>*/}
                    {/*        <p>*/}
                    {/*            If you're going to lead a space frontier, it has to be government; it'll never be*/}
                    {/*            private enterprise. Because the space frontier is dangerous, and it's expensive, and it*/}
                    {/*            has unquantified risks.*/}
                    {/*        </p>*/}
                    {/*        /!* Child comment 1 *!/*/}
                    {/*        <div className="d-flex mt-4">*/}
                    {/*            <div className="ms-3">*/}
                    {/*                <div className="fw-bold">Commenter Name</div>*/}
                    {/*                <p>*/}
                    {/*                    And under those conditions, you cannot establish a capital-market evaluation of*/}
                    {/*                    that enterprise. You can't get investors.*/}
                    {/*                </p>*/}
                    {/*            </div>*/}
                    {/*        </div>*/}
                    {/*        /!* Child comment 2 *!/*/}
                    {/*        <div className="d-flex mt-4">*/}
                    {/*            <div className="ms-3">*/}
                    {/*                <div className="fw-bold">Commenter Name</div>*/}
                    {/*                <p>*/}
                    {/*                    When you put money directly to a problem, it makes a good headline.*/}
                    {/*                </p>*/}
                    {/*            </div>*/}
                    {/*        </div>*/}
                    {/*    </div>*/}
                    {/*</div>*/}

                    {/* Single comment */}
                    <div className="d-block">
                        <Row key={id} className="ms-1">
                            <Col md={3} className={'fw-bold'}>
                                {authorCode}
                            </Col>
                            <Col md={5}>
                                {content}
                            </Col>
                            <Col md={3} style={{width: '7rem'}}>
                                <small>{convertToKoreanTime(createdAt)}</small>
                            </Col>
                            <Col md={1}>
                                <Dropdown>
                                    <Dropdown.Toggle variant="outline-dark" id="dropdownMenuLink">
                                    </Dropdown.Toggle>
                                    <Dropdown.Menu>
                                        <Dropdown.Item onClick={() => commentUpdate()}>수정</Dropdown.Item>
                                        <Dropdown.Item onClick={() => commentModifyAndDelete(id, "Delete")}>삭제</Dropdown.Item>
                                    </Dropdown.Menu>
                                </Dropdown>
                            </Col>
                        </Row>
                        <Collapse in={open} className={'mb-1 mt-1'}>
                            <div id="example-collapse-text">
                                <Form>
                                      <Form.Control
                                            as="textarea"
                                            name={'contentModify'}
                                            rows={3}
                                            onChange={handleInputChange}
                                            onKeyDown={handleKeyDown}
                                            placeholder="답변해주세요!"
                                        />
                                        <Form.Control
                                            type={"button"}
                                            value={"수정"}
                                            onClick={() => commentModifyAndDelete(id, "Modify")}
                                        />
                                    </Form>
                            </div>
                        </Collapse>
                    </div>
        </section>
    )
}

