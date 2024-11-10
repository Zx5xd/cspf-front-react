import { Route } from 'react-router-dom';
import { ExpertHome } from '@/pages/expert/ExpertHome.tsx';
import { ExpertMyPage } from '@/pages/expert/ExpertMyPage.tsx';
import { Announcement } from '@/pages/public/Announcement.tsx';
import { Questions } from '@/pages/public/Questions.tsx';
import { SearchNewsList } from '@/components/search/SearchNewsList.tsx';
import { SearchLawList } from '@/components/search/SearchLawList.tsx';
import { ExpertSignup } from '@/pages/expert/ExpertSignup.tsx';
import React from 'react';

export const expertRouter: React.FC = () => {
  return(
    <>
      <Route path="/expert" element={<ExpertHome/>}>
        <Route path={"myPage"} element={<ExpertMyPage/>}/>
        <Route path={"announcement"} element={<Announcement/>}/>
        <Route path={"questions"} element={<Questions/>}/>
        {/*News, caseLaw 뼈대 제작 후 재확인*/}
        <Route path="searchNews" element={<SearchNewsList/>}/>
        <Route path="caseLaw" element={<SearchLawList />} />
        <Route path={"signup"} element={<ExpertSignup/>}/>
      </Route>
    </>
  )
}