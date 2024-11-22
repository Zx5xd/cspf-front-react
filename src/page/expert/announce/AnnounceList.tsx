import {Button} from "@/components/ui/button.tsx";
import React, {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {AnnounceEntity} from "@/types/entity.ts";
import {announceList} from "@/services/Board.ts";
import {announceManageColumns} from "@/page/admin/announce/Columns.tsx";
import {DataTable} from "@/page/admin/user/data-table.tsx";
import {AnnDataTable} from "@/page/admin/announce/data-table.tsx";
import {announceColumns} from "@/page/expert/announce/Columns.tsx";
import {ExpertDataTable} from "@/page/expert/data-table.tsx";
import {SideMenubar} from "@/page/expert/sideMenubar.tsx";

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

export const AnnounceList = () => {
  const data = getData()
  const navigate = useNavigate()

  return(
    <div className={"sm:container sm:mx-auto h-screen py-8"}>
      <main className="flex flex-row h-full overflow-hidden">
        <SideMenubar/>
        <ExpertDataTable columns={announceColumns} data={data}/>
      </main>
    </div>
  )
}