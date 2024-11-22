import {Button} from "@/components/ui/button.tsx";
import React, {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {questionList} from "@/services/Board.ts";
import {QuestionsEntity} from "@/types/entity.ts";
import {quesManageColumns} from "@/page/admin/question/Columns.tsx";
import {QuesManageDataTable} from "@/page/admin/question/data-table.tsx";
import {DataTable} from "@/page/admin/user/data-table.tsx";
import {ExpertDataTable} from "@/page/expert/data-table.tsx";
import {quesBoardColumns} from "@/page/expert/question/Columns.tsx";
import {SideMenubar} from "@/page/expert/sideMenubar.tsx";
import {QuesDataTable} from "@/page/expert/question/data-table.tsx";

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

export const QuestionList = () => {
  const data = getData()
  const navigate = useNavigate()

  return(
    <div className={"sm:container sm:mx-auto h-screen py-8"}>
      <main className="flex flex-row h-full overflow-hidden">
        <SideMenubar/>
        <QuesDataTable columns={quesBoardColumns} data={data}/>
      </main>
    </div>
  )
}