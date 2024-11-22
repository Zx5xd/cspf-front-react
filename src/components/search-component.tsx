import * as React from "react"
import { Input } from "@/components/ui/input.tsx"
import { Button } from "@/components/ui/button.tsx"
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search } from 'lucide-react'
import {useState} from "react";

interface SearchComponentProps {
  children?: React.ReactNode;
  onSearch: (query: string) => void;
}

export default function SearchComponent({ children, onSearch }: SearchComponentProps) {

  const [query, setQuery] = useState(""); // 입력 상태 관리

  const handleSearch = () => {
    onSearch(query); // 상위로 검색어 전달
  };

  return (
    <div className="w-full p-4 border-b">
      <div className="container mx-auto">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="검색어를 입력하세요"
                className="pl-8"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
            </div>
          </div>
          <div className="flex gap-2">
            {/*<Select defaultValue="title">*/}
            {/*  <SelectTrigger className="w-[120px]">*/}
            {/*    <SelectValue placeholder="검색 조건" />*/}
            {/*  </SelectTrigger>*/}
            {/*  <SelectContent>*/}
            {/*    <SelectItem value="title">제목</SelectItem>*/}
            {/*    <SelectItem value="content">내용</SelectItem>*/}
            {/*    <SelectItem value="author">작성자</SelectItem>*/}
            {/*    <SelectItem value="all">전체</SelectItem>*/}
            {/*  </SelectContent>*/}
            {/*</Select>*/}
            <Button type="submit" onClick={handleSearch}>
              검색
            </Button>
          </div>
        </div>
      </div>
      <div className={'mt-10'}>
        <>{children}</>
      </div>
    </div>
  )
}