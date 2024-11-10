import { Route } from 'react-router-dom';
import { AdminHome } from '@/pages/admin/AdminHome.tsx';
import { UserManage } from '@/pages/admin/UserManage.tsx';
import { ExpertManage } from '@/pages/admin/ExpertManage.tsx';
import { ChatManage } from '@/pages/admin/ChatManage.tsx';
import { AnnounceManage } from '@/pages/admin/AnnounceManage.tsx';
import { QuestionsManage } from '@/pages/admin/QuestionsManage.tsx';
import { CheckCert } from '@/pages/admin/CheckCert.tsx';
import React from 'react';

export const adminRouter:React.FC = () => {
  return(
    <>
      <Route path="/admin" element={<AdminHome/>}>
        <Route path="userManage" element={<UserManage/>}/>
        <Route path="expertManage" element={<ExpertManage/>}/>
        <Route path="chatManage" element={<ChatManage/>}/>
        <Route path="announManage" element={<AnnounceManage/>}/>
        <Route path="questionsManage" element={<QuestionsManage/>}/>
        <Route path="chckCert" element={<CheckCert/>}/>
      </Route>
    </>
  )
}