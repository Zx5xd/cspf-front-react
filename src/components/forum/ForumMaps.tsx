import {AniInfo, NewsForumItem, LawsForumItem} from "./ForumItems";
import {AniInfoProps, ForumItemProps} from "./PropInterface";
import {Col, Container, Form, Row} from "react-bootstrap";

export const forumMap = (forumItems: ForumItemProps[]) => {
    const renderType = forumItems.map((item) => item.link.includes('n.news.naver.com'));
    const aniKeywords = ['동물 학대', '동물 보호법', '반려동물 권리', '동물 복지', '동물 보험'];

    console.log(`forumMap 진입`);
    console.log(renderType[0]);

    return <Container>
        <Row>
            <Col lg={12}>
                <div className="wrapper wrapper-content animated fadeInRight">

                    <div className="ibox-content forum-container">
                        <div className="forum-title">
                            {/*<h3>(renderType[0] === true? {`뉴스`} : {`판례`})</h3><br/>*/}


                                    {/*{*/}
                                    {/*    aniKeywords.map((item: any, index:number) => (*/}


                                    {/*    ))*/}
                                    {/*}*/}


                        </div>
                        {forumItems.map((item, index) => renderType[0] === true ? (
                            <NewsForumItem
                                key={index}
                                title={item.title}
                                link={item.link}
                                description={item.description}
                                pubDate={item.pubDate}
                                types={item.types}
                            />):
                            (<LawsForumItem key={index} title={item.title} link={item.link} description={item.description} pubDate={item.description} types={item.types}/>)
                        )}
                    </div>
                </div>
            </Col>
        </Row>
    </Container>;
}

export const AniInfoMap = (Infos: AniInfoProps[]) => {
    console.log(`InfoMaps`);
    return (
        <Container>
            <Row>
                <Col lg={12}>
                    <div className="wrapper wrapper-content animated fadeInRight">
                        <div className="ibox-content m-b-sm border-bottom">
                            <div className="p-xs">
                                <h2>Welcome to our forum</h2>
                                <span>Feel free to choose topic you're interested in.</span>
                            </div>
                        </div>
                        <div className="ibox-content forum-container">
                            <div className="forum-title">
                                <h3>General subjects</h3>
                            </div>
                            {Infos.map((item) => (
                                <AniInfo
                                    dogRegNo={item.dogRegNo}
                                    dogNm={item.dogNm}
                                    sexNm={item.sexNm}
                                    kindNm={item.kindNm}
                                    neuterYn={item.neuterYn}
                                />
                            ))}
                        </div>
                    </div>
                </Col>
            </Row>
        </Container>
    );
}