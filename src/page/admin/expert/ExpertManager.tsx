import {Table} from "@/components/ui/table.tsx";
import {DataTable} from "@/page/admin/user/data-table.tsx";
import {columns} from "@/page/admin/user/Columns.tsx";
import {Button} from "@/components/ui/button.tsx";
import { Link } from "@radix-ui/react-navigation-menu";
import {useNavigate} from "react-router-dom";
import React, {useEffect, useState} from "react";
import {ExpertEntity} from "@/types/entity.ts";
import {expertInfo} from "@/services/UserInfo.ts";
import {ExpertDataTable} from "@/page/admin/expert/data-table.tsx";
import {expertColumns, expertcolumns, Expertcolumns} from "@/page/admin/expert/Columns.tsx";

function getData(): ExpertEntity[] {
  // Fetch data from your API here.

  const [expert, setExpert] = useState<ExpertEntity[]>([]);

  useEffect(() => {
    expertInfo().then(data => setExpert(data))
  }, []);
  return expert
}

export const ExpertManager = () => {
  const data = getData()
  const navigate = useNavigate()



  return(
    <div className={"sm:container sm:mx-auto bg-white/5 h-screen py-8"}>
      <main className="flex flex-row h-full overflow-hidden">
        <div className="flex flex-col h-full backdrop-brightness-50  mr-2 rounded-lg w-64">
          <span className="text-center py-2 font-bold border-b">관리</span>
          <Button variant="ghost" className="mx-2 my-2 select-none"
                  onClick={() => navigate('/admin/user')}>유저</Button>
          <Button variant="secondary" className="mx-2 mb-2" onClick={() => navigate('/admin/expert')}>
            전문가
          </Button>
          <Button variant="ghost" className="mx-2 mb-2" onClick={() => navigate('/admin/blackList')}>신고</Button>
          <span className="text-center py-2 font-bold border-y select-none">게시판</span>
          <Button variant="ghost" className="mx-2 my-2" onClick={() => navigate('/admin/announce')}>공지</Button>
          <Button variant="ghost" className="mx-2 mb-2" onClick={() => navigate('/admin/question')}>문의</Button>
          <span className="text-center py-2 font-bold border-y select-none">인증</span>
          <Button variant="ghost" className="mx-2 my-2" onClick={() => navigate('/admin/chckCert')}>자격증</Button>
        </div>
        <DataTable columns={expertColumns} data={data}/>
      </main>
    </div>
  )
}