// src/App.tsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SSOHome from './pages/SSOHome.tsx';
import EmailBut from "./mainBut.tsx";
import NaverLoginCallback from './components/SSO/NaverLoginCallback.tsx';
import {SearchNewsList} from "./components/search/SearchNewsList.tsx";
import {SearchLawList} from "./components/search/SearchLawList.tsx";
import {SearchAniInfo} from "./components/search/SearchAniInfo.tsx";
import Itt from "./components/ITTComponent.tsx";
import VoiceChat from "./VoiceChat.tsx";
import GoogleLoginCallback from './components/SSO/GoogleLoginCallback.tsx';
import { AdminLogin } from './pages/admin/AdminLogin.tsx';
import { AdminHome } from './pages/admin/AdminHome.tsx';
import { UserManage } from './pages/admin/UserManage.tsx';
import { ChatManage } from './pages/admin/ChatManage.tsx';
import { ExpertManage } from './pages/admin/ExpertManage.tsx';
import { AnnounceManage } from './pages/admin/AnnounceManage.tsx';
import { QuestionsManage } from './pages/admin/QuestionsManage.tsx';
import { ExpertLogin } from './pages/expert/ExpertLogin.tsx';
import { ExpertSignup } from './pages/expert/ExpertSignup.tsx';
import { ExpertHome } from './pages/expert/ExpertHome.tsx';
import { Announcement } from './pages/public/Announcement.tsx';
import { Questions } from './pages/public/Questions.tsx';
import { CheckCert } from './pages/admin/CheckCert.tsx';
import { ExpertMyPage } from './pages/expert/ExpertMyPage.tsx';
import Email from './email.tsx';
import {UserLogin} from "./pages/UserLogin.tsx";
import {Chat} from "./components/chat/Chat.tsx";
import {ChatComplaint} from "./pages/admin/ChatComplaint.tsx";

export const AuthWrapper = ({children}:{children:React.Node}) =>{
    //const  { } = useAuth()
    //auth check
    return {children}
}

const App: React.FC = () => {

    return (
        <Router>

            <Routes>
                <Route path="/login">
                    <Route path="admin" element={<AdminLogin/>}/>
                    <Route path="expert" element={<ExpertLogin/>}/>
                    <Route path={"user"} element={<UserLogin/>}/>
                </Route>

                <Route path="/admin" element={<AdminHome/>}>
                    <Route path="userManage" element={<UserManage/>}/>
                    <Route path="expertManage" element={<ExpertManage/>}/>
                    <Route path="chatManage" element={<ChatManage/>}/>
                    <Route path="announManage" element={<AnnounceManage/>}/>
                    <Route path="questionsManage" element={<QuestionsManage/>}/>
                    <Route path="chckCert" element={<CheckCert/>}/>
                </Route>

                <Route path="/expert" element={<ExpertHome/>}>
                    <Route path={"myPage"} element={<ExpertMyPage/>}/>
                    <Route path={"announcement"} element={<Announcement/>}/>
                    <Route path={"questions"} element={<Questions/>}/>
                    {/*News, caseLaw 뼈대 제작 후 재확인*/}
                    <Route path="searchNews" element={<SearchNewsList/>}/>
                    <Route path="caseLaw" element={<SearchLawList />} />
                    <Route path={"signup"} element={<ExpertSignup/>}/>
                </Route>

                <Route path="/pass" element={<SSOHome />} />
                <Route path="/auth/google/callback" element={<GoogleLoginCallback />} />
                <Route path="/auth/naver/callback" element={<NaverLoginCallback />} />
                <Route path="/check" element={<EmailBut />} />
                <Route path="/searchNews" element={<SearchNewsList />} />
                <Route path={"/chatcomp"} element={<ChatComplaint/>}/>
                {/*<Route path="/voiceChat" element={<VoiceChat />} /> /!* VoiceChat 라우트 추가 *!/*/}
                <Route path="/chat" element={<Chat />} />
                <Route path="/caseLaw" element={<SearchLawList />} />
                <Route path="/aniInfo" element={<SearchAniInfo />} />
                <Route path="/email" element={<Email />} />
                <Route path="/itt" element={<Itt />} />
            </Routes>
        </Router>
    );
};

export default App;
