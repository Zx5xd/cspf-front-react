import {Button} from "@/components/ui/button.tsx";
import React, {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {questionList} from "@/services/Board.ts";
import {QuestionsEntity} from "@/types/entity.ts";
import {quesManageColumns} from "@/page/admin/question/Columns.tsx";
import {QuesManageDataTable} from "@/page/admin/question/data-table.tsx";
import {DataTable} from "@/page/admin/user/data-table.tsx";

function getData(): QuestionsEntity[] {
  // Fetch data from your API here.
  const [queList, setQueList] = useState<QuestionsEntity[]>([])


  useEffect(() => {
    questionList().then(data => {
      console.log(data),
          setQueList(data.data)
    })

        }, []);
  return queList
}

export const QuestionManager = () => {
  const data = getData()
  const navigate = useNavigate()

  return(
    <div className={"sm:container sm:mx-auto bg-white/5 h-screen py-8"}>
      <main className="flex flex-row h-full overflow-hidden">
        <div className="flex flex-col h-full backdrop-brightness-50 mr-2 rounded-lg w-64">
          <span className="text-center py-2 font-bold border-b">관리</span>
          <Button variant="ghost" className="mx-2 my-2 select-none"
                  onClick={() => navigate('/admin/user')}>유저</Button>
          <Button variant="ghost" className="mx-2 mb-2" onClick={() => navigate('/admin/expert')}>
            전문가
          </Button>
          <Button variant="ghost" className="mx-2 mb-2" onClick={() => navigate('/admin/blackList')}>신고</Button>
          <span className="text-center py-2 font-bold border-y select-none">게시판</span>
          <Button variant="ghost" className="mx-2 my-2" onClick={() => navigate('/admin/announce')}>공지</Button>
          <Button variant="secondary" className="mx-2 mb-2" onClick={() => navigate('/admin/question')}>문의</Button>
          <span className="text-center py-2 font-bold border-y select-none">인증</span>
          <Button variant="ghost" className="mx-2 my-2" onClick={() => navigate('/admin/chckCert')}>자격증</Button>
        </div>
        <DataTable columns={quesManageColumns} data={data}/>
      </main>
    </div>
  )
}