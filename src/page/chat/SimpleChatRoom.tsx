import {ChatRoom} from "@/services/Chat.ts";
import dayjs from "dayjs";
import {Button} from "@/components/ui/button.tsx";
import {Badge} from "@/components/ui/badge.tsx";
import {MouseEvent} from "react";
import {initializeSocket} from "@/store/chatStore.ts";

export const SimpleChatRoom = (
  {
    selected=false,
    chatRoom
  }:{
    selected?:boolean;
    chatRoom:ChatRoom
  }
) => {
  const getTimeElapsed = (updatedTime:Date | null) => {
    if (updatedTime != null) {
      return dayjs(updatedTime).fromNow();
    } else {
      return null;
    }
  }

  const handleClick = (event:MouseEvent) => {
    console.log(chatRoom.chatRoomID)
    if (chatRoom.chatRoomID != null)
      initializeSocket(chatRoom.chatRoomID)
  }

  return(
    <Button variant={selected ? "secondary" : "ghost"} className={
      "group flex flex-row max-w-full rounded-lg hover:bg-neutral-800 cursor-pointer transition duration-120 h-12 my-1 items-center select-none border-b text-left"
    } onClick={handleClick}>
      <div className="flex grow flex-col min-w-0 pl-1">
        <div className="font-semibold text-ellipsis whitespace-nowrap overflow-hidden">
          {chatRoom.chatRoom ? chatRoom.chatRoom : "User"}
        </div>
        <div className="text-sm font-thin text-nowrap">
          {getTimeElapsed(chatRoom.consultEndTime)}
        </div>
      </div>
      <Badge variant={"secondary"}>
        99+
      </Badge>
    </Button>

  )
}