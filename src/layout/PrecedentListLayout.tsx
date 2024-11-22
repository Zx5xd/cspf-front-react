
import React, {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {SideMenubar} from "@/page/expert/sideMenubar.tsx";
import SearchComponent from "@/components/search-component.tsx";
import {searchNews, searchPrecedent} from "@/services/Utils.ts";
import {NewsList} from "@/page/expert/news/NewsList.tsx";
import {PrecedentList} from "@/page/expert/precedent/PrecedentList.tsx";



export interface precData{
  법원명 : string
  법원종류코드: string
  사건명: string
  사건번호: string
  사건종류명: string
  사건종류코드: string
  선고: string
  선고일자: string
  판결유형: string
  판례상세링크 : string
  판례일련번호: string
}

export const PrecedentListLayout = () => {
  const navigate = useNavigate()
  const [query, setQuery] = useState("동물보호");
  const [precData, setPrecData] = useState<precData[]>([]);
  const [page, setPage] = useState(1);
  const [isFetching, setIsFetching] = useState(false);

  useEffect(() => {
    getData(query, 1)

  }, [query]);

  const getData = (query:string, page: number) => {
    searchPrecedent(query, page).then(data => {
      const jsonData = JSON.parse(data).prec
        setPrecData((prev) => [...prev, ...jsonData]);
        setPage((prev) => prev + 1);
      }).finally(() => setIsFetching(false));
  }

  return(
    <div className={"sm:container sm:mx-auto h-screen py-8"}>
      <main className="flex flex-row h-full overflow-hidden">
        <SideMenubar/>

        <SearchComponent onSearch={(query) => {
          setQuery(query)
          // setNewsData([])
          setPage(1)
        }}>
          <PrecedentList precItems={precData} isFetching={isFetching} onLoadMore={() => getData(query, page)}/>
        </SearchComponent>
      </main>
    </div>
  )
}