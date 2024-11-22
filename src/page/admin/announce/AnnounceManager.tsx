import {Button} from "@/components/ui/button.tsx";
import React, {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {AnnounceEntity} from "@/types/entity.ts";
import {announceList} from "@/services/Board.ts";
import {announceManageColumns} from "@/page/admin/announce/Columns.tsx";
import {DataTable} from "@/page/admin/user/data-table.tsx";
import {AnnDataTable} from "@/page/admin/announce/data-table.tsx";

function getData(): AnnounceEntity[] {
  // Fetch data from your API here.
  const [anList, setAnList] = useState<AnnounceEntity[]>([]);

  useEffect(() => {
    announceList().then(data => {
      console.log(data)
      setAnList(data.data)})
  }, []);
  return anList
}

export const AnnounceManager = () => {
  const data = getData()
  const navigate = useNavigate()

  return(
    <div className={"sm:container sm:mx-auto h-screen py-8 bg-white/5"}>
      <main className="flex flex-row h-full overflow-hidden">
        <div className="flex flex-col h-full backdrop-brightness-50 mr-2 rounded-lg w-64">
          <span className="text-center py-2 font-bold border-b">관리</span>
          <Button variant="ghost" className="mx-2 my-2 select-none" onClick={()=>navigate('/admin/user')}>유저</Button>
          <Button variant="ghost" className="mx-2 mb-2" onClick={()=>navigate('/admin/expert')}>
            전문가
          </Button>
          <Button variant="ghost" className="mx-2 mb-2" onClick={() => navigate('/admin/blackList')}>신고</Button>
          <span className="text-center py-2 font-bold border-y select-none">게시판</span>
          <Button variant="secondary" className="mx-2 my-2" onClick={() => navigate('/admin/announce')}>공지</Button>
          <Button variant="ghost" className="mx-2 mb-2" onClick={()=> navigate('/admin/question')}>문의</Button>
          <span className="text-center py-2 font-bold border-y select-none">인증</span>
          <Button variant="ghost" className="mx-2 my-2" onClick={() => navigate('/admin/chckCert')}>자격증</Button>
        </div>
        <AnnDataTable columns={announceManageColumns} data={data}/>
      </main>
    </div>
  )
}