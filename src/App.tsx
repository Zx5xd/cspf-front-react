import {Login} from "@/page/Login.tsx";
import {ThemeProvider} from "@/components/theme-provider.tsx";
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import {ChatComponent} from "@/page/chat/Chat.tsx";
import {UserManager} from "@/page/admin/user/UserManager.tsx";
import {ExpertManager} from "@/page/admin/expert/ExpertManager.tsx";
import {BlackListManager} from "@/page/admin/blackList/BlackListManager.tsx";
import {AnnounceManager} from "@/page/admin/announce/AnnounceManager.tsx";
import {QuestionManager} from "@/page/admin/question/QuestionManager.tsx";
import {ChckCertManager} from "@/page/admin/chckCert/ChckCertManager.tsx";
import {ProfileEdit} from "@/page/admin/user/ProfileEdit.tsx";
import {AdminLogin} from "@/page/admin/AdminLogin.tsx";
import {ExpertLogin} from "@/page/expert/ExpertLogin.tsx";
import {NewsArticleDetail} from "@/page/expert/news/news-article-detail.tsx";
import {AnnounceDetail} from "@/page/admin/announce/AnnounceDetail.tsx";
import {QuestionDetail} from "@/page/admin/question/QuestionDetail.tsx";
import {AnnounceList} from "@/page/expert/announce/AnnounceList.tsx";
import {QuestionList} from "@/page/expert/question/QuestionList.tsx";
import {ChatPage} from "@/page/expert/chat.tsx";
import {AuthWrapper} from "@/auth/AuthWrapper.tsx";
import {MyPage} from "@/page/expert/mypage/mypage.tsx";
import {BookingList} from "@/page/expert/booking/BookingList.tsx";
import {ReqBookingList} from "@/page/expert/booking/ReqBookingList.tsx";
import {Home} from "@/page/expert/Home.tsx";
import {ReqLawyerChatList} from "@/page/expert/reqChat/ReqLawyerChatList.tsx";
import {LawyerChatList} from "@/page/expert/reqChat/LawyerChatList.tsx";
import {ReqInsurerChatList} from "@/page/expert/reqChat/ReqInsurerChatList.tsx";
import {InsurerChatList} from "@/page/expert/reqChat/InsurerChatList.tsx";
import {AnnounceBoardDetail} from "@/page/expert/announce/AnnounceBoardDetail.tsx";
import {LawReqChatLayout} from "@/layout/LawReqChatLayout.tsx";
import {NewsList, NewsListLayout} from "@/layout/NewsListLayout.tsx";
import {PrecedentListLayout} from "@/layout/PrecedentListLayout.tsx";
import {MypageLayout} from "@/layout/MypageLayout.tsx";
import {QuestionBoardDetail} from "@/page/expert/question/QuestionBoardDetail.tsx";
import {InsReqChatLayout} from "@/layout/InsReqChatLayout.tsx";
import {ReqBookingLayout} from "@/layout/ReqBookingLayout.tsx";

function App() {
  return (
    <ThemeProvider defaultTheme="dark">

      <BrowserRouter>
          <AuthWrapper>
        <Routes>
          <Route path="/admin">
              <Route path="user" element={<UserManager/>}/>
              <Route path="expert" element={<ExpertManager/>}/>
              <Route path={"blackList"} element={<BlackListManager/>}/>
              <Route path={"announce"} element={<AnnounceManager/>}/>
              <Route path={"anDetail"} element={<AnnounceDetail/>}/>
              <Route path={"question"} element={<QuestionManager/>}/>
              <Route path={"quesDetail"} element={<QuestionDetail/>}/>
              <Route path={"chckCert"} element={<ChckCertManager/>}/>
              <Route path={"edit"} element={<ProfileEdit/>}/>
          </Route>
            <Route path={"/expert"}>
                <Route path={"home"} element={<Home/>}/>
                <Route path={"news"} element={<NewsListLayout/>}/>
                <Route path={"newsDetail"} element={<NewsArticleDetail/>}/>
                <Route path={"preceList"} element={<PrecedentListLayout/>}/>
                <Route path={"announce"} element={<AnnounceList/>}/>
                <Route path={"anDetail"} element={<AnnounceBoardDetail/>}/>
                <Route path={"quesList"} element={<QuestionList/>}/>
                <Route path={"quesDetail"} element={<QuestionBoardDetail/>}/>
                <Route path={"chat"} element={<ChatPage/>}/>
                <Route path={"mypage"} element={<MypageLayout/>}/>

                {/* 변호사 */}
                <Route path={"law"} element={<LawReqChatLayout/>}/>
                <Route path={"reqLawList"} element={<ReqLawyerChatList/>}/>
                <Route path={"lawList"} element={<LawyerChatList/>}/>

                {/* 수의사 */}
                <Route path={"vet"} element={<ReqBookingLayout/>}/>
                <Route path={"reqBooking"} element={<ReqBookingList/>}/>
                <Route path={"bookingList"} element={<BookingList/>}/>

                {/* 보험사 */}
                <Route path={'ins'} element={<InsReqChatLayout/>}/>
                <Route path={"reqInsList"} element={<ReqInsurerChatList/>}/>
                <Route path={"insList"} element={<InsurerChatList/>}/>
            </Route>

          <Route path="/chat" element={<ChatComponent/>}/>
            <Route path="/login" element={<Login/>}/>
            <Route path={"/login/admin"} element={<AdminLogin/>}/>
            <Route path={"/login/expert"} element={<ExpertLogin/>}/>

        </Routes>
          </AuthWrapper>
      </BrowserRouter>
    </ThemeProvider>
  )
}

export default App
