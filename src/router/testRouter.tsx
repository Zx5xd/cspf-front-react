import { Route } from 'react-router-dom';
import SSOHome from '@/test/SSOHome.tsx';
import GoogleLoginCallback from '@/test/SSO/GoogleLoginCallback.tsx';
import NaverLoginCallback from '@/test/SSO/NaverLoginCallback.tsx';
import EmailBut from '@/test/mainBut.tsx';
import { SearchNewsList } from '@/components/search/SearchNewsList.tsx';
import { ChatComplaint } from '@/pages/admin/ChatComplaint.tsx';
import Chat from '@/components/chat/Chat.tsx';
import { SearchLawList } from '@/components/search/SearchLawList.tsx';
import { SearchAniInfo } from '@/components/search/SearchAniInfo.tsx';
import Email from '@/test/email.tsx';
import Itt from '@/test/ITTComponent.tsx';
import React from 'react';

export const testRouter: React.FC = () => {
  return (
    <>
      <Route path="/pass" element={<SSOHome />} />
      <Route path="/auth/google/callback" element={<GoogleLoginCallback />} />
      <Route path="/auth/naver/callback" element={<NaverLoginCallback />} />
      <Route path="/check" element={<EmailBut />} />
      <Route path="/searchNews" element={<SearchNewsList />} />
      <Route path={"/chatcomp"} element={<ChatComplaint/>}/>
      {/*<Route path="/voiceChat" element={<VoiceChat />} /> /!* VoiceChat 라우트 추가 *!/*/}
      <Route path="/chat" element={<Chat/>} />
      <Route path="/caseLaw" element={<SearchLawList />} />
      <Route path="/aniInfo" element={<SearchAniInfo />} />
      <Route path="/email" element={<Email />} />
      <Route path="/itt" element={<Itt />} />
    </>
  )
}