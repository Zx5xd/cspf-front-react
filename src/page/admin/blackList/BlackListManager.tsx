import {DataTable} from "@/page/admin/user/data-table.tsx";
import {Button, buttonVariants} from "@/components/ui/button.tsx";
import React, {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {BlackListEntity} from "@/types/entity.ts";
import {chatBlackList} from "@/services/UserManage.ts";
import {blacklistManageColumns} from "@/page/admin/blackList/Columns.tsx";

function getData(): BlackListEntity[] {
  // Fetch data from your API here.
  const [blList, setblList] = useState<BlackListEntity[]>([]);

  useEffect(() => {
    chatBlackList().then(data => {
      console.log(data)
      setblList(data)});
  }, []);
  return blList
}

export const BlackListManager = () => {
  const data = getData()
  const navigate = useNavigate()

  return(
    <div className={"sm:container sm:mx-auto h-screen py-8 bg-white/5"}>
      <main className="flex flex-row h-full overflow-hidden">
        <div className="flex flex-col h-full backdrop-brightness-50 mr-2 rounded-lg w-64">
          <span className="text-center py-2 font-bold border-b">관리</span>
          <Button variant="ghost" className="mx-2 my-2 select-none"
                  onClick={() => navigate('/admin/user')}>유저</Button>
          <Button variant="ghost" className="mx-2 mb-2" onClick={() => navigate('/admin/expert')}>
            전문가
          </Button>
          <Button variant="secondary" className="mx-2 mb-2" onClick={() => navigate('/admin/blackList')}>신고</Button>
          <span className="text-center py-2 font-bold border-y select-none">게시판</span>
          <Button variant="ghost" className="mx-2 my-2" onClick={() => navigate('/admin/announce')}>공지</Button>
          <Button variant="ghost" className="mx-2 mb-2" onClick={() => navigate('/admin/question')}>문의</Button>
          <span className="text-center py-2 font-bold border-y select-none">인증</span>
          <Button variant="ghost" className="mx-2 my-2" onClick={() => navigate('/admin/chckCert')}>자격증</Button>
        </div>
        <DataTable columns={blacklistManageColumns} data={data}/>
      </main>
    </div>
  )
}