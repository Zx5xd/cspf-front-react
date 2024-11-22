import {
  DropdownMenu, DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel, DropdownMenuRadioGroup, DropdownMenuRadioItem, DropdownMenuSeparator,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu.tsx";
import {Button} from "@/components/ui/button.tsx";
import {LucideArrowUpDown, LucideFilter} from "lucide-react";
import {ChatRoom} from "@/types";
import {SimpleChatRoom} from "@/page/chat/SimpleChatRoom.tsx";
import {useRef, useState} from "react";

export const SidebarComponent = ({getRooms,isViewRoom}:{getRooms:ChatRoom[],isViewRoom:boolean}) => {
  const chatRoomList = useRef<HTMLDivElement | null>(null)
  const sidebarRef = useRef<HTMLDivElement | null>(null);
  return(
    <div ref={sidebarRef} className={`flex flex-col h-full overflow-x-hidden transition-all duration-300 ease-in-out ${isViewRoom ? "w-64 border-r" : "w-0"}`}>
      <div className="flex flex-none flex-col border-b p-4 font-bold text-lg">
        test
      </div>
      <div className="flex flex-row justify-end p-2 border-b">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="secondary" className="p-0 w-8 h-8 me-1">
              <LucideArrowUpDown/>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>정렬</DropdownMenuLabel>
            <DropdownMenuSeparator/>
            <DropdownMenuRadioGroup>
              <DropdownMenuRadioItem value={"latest"}>최신</DropdownMenuRadioItem>
              <DropdownMenuRadioItem value={"old"}>오래전</DropdownMenuRadioItem>
              <DropdownMenuSeparator/>
              <DropdownMenuRadioItem value={"old"}>답장 내림차순</DropdownMenuRadioItem>
              <DropdownMenuRadioItem value={"old"}>답장 오름차순</DropdownMenuRadioItem>
            </DropdownMenuRadioGroup>
          </DropdownMenuContent>
        </DropdownMenu>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="secondary" className="p-0 w-8 h-8">
              <LucideFilter/>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>필터</DropdownMenuLabel>
            <DropdownMenuSeparator/>
            <DropdownMenuCheckboxItem>
              읽은 메시지
            </DropdownMenuCheckboxItem>
            <DropdownMenuCheckboxItem>
              안 읽은 메시지
            </DropdownMenuCheckboxItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div ref={chatRoomList} className="flex flex-1 flex-col p-2 overflow-y-auto overflow-x-hidden max-w-full ">
        {
          getRooms.map((value:ChatRoom, index)=>{
            return (
              <SimpleChatRoom chatRoom={value} key={index}/>
            )
          })
        }
      </div>
    </div>
  )
}