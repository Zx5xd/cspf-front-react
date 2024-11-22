
import React, {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {SideMenubar} from "@/page/expert/sideMenubar.tsx";
import SearchComponent from "@/components/search-component.tsx";
import {searchNews} from "@/services/Utils.ts";
import {NewsList} from "@/page/expert/news/NewsList.tsx";

interface newsHeader{

}

export interface newsData{
  title: string
  description: string
  link: string
  originallink: string
  pubDate: string
}

export const NewsListLayout = () => {
  const navigate = useNavigate()
  const [newsData, setNewsData] = useState<newsData[]>([]);
  const [query, setQuery] = useState("동물보호");
  const [page, setPage] = useState(1);
  const [isFetching, setIsFetching] = useState(false);
  const [connDetail, setConnDetail] = useState(false);

  useEffect(() => {
    getData(query, 1)

  }, [query]);

  const getData = (query:string, page: number) => {
      searchNews(query, page).then(data => {
        const newItems = JSON.parse(data).items;
        setNewsData((prev) => [...prev, ...newItems]);
        setPage((prev) => prev + 1);
      }).finally(() => setIsFetching(false));
  }

  return(
    <div className={"sm:container sm:mx-auto h-screen py-8"}>
      <main className="flex flex-row h-full overflow-hidden">
        <SideMenubar/>

        <SearchComponent onSearch={(query) => {
          setQuery(query)
          setNewsData([])
          setPage(1)
        }}>
          <NewsList newsItems={newsData} isFetching={isFetching} onLoadMore={() => getData(query, page)} setConnDetail={setConnDetail}/>
        </SearchComponent>
      </main>
    </div>
  )
}