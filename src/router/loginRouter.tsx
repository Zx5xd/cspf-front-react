import { Route } from 'react-router-dom';
import { AdminLogin } from '@/pages/admin/AdminLogin.tsx';
import { ExpertLogin } from '@/pages/expert/ExpertLogin.tsx';
import { UserLogin } from '@/test/UserLogin.tsx';
import React from 'react';

export const LoginRouter: React.FC = () => {
  return (
    <>
      <Route path="/login">
         <Route path="admin" element={<AdminLogin />} />
        <Route path="expert" element={<ExpertLogin />} />
         <Route path="user" element={<UserLogin />} />
      </Route>
  </>
  );
};
