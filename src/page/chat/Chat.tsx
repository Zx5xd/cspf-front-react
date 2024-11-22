import {PaperPlaneIcon} from "@radix-ui/react-icons"

import {ChatMessageList} from "@/components/ui/chat/chat-message-list.tsx";
import {ChatBubble, ChatBubbleAvatar, ChatBubbleMessage} from "@/components/ui/chat/chat-bubble.tsx";
import {ChatInput} from "@/components/ui/chat/chat-input.tsx";
import {Button} from "@/components/ui/button.tsx";
import {
  LucidePanelLeft,
  LucidePawPrint,
  LucidePhone,
  LucideUser
} from "lucide-react";
import {Tooltip, TooltipContent, TooltipProvider, TooltipTrigger} from "@/components/ui/tooltip.tsx";
import {ChangeEvent, FormEvent, KeyboardEvent, useEffect, useRef, useState} from "react";
import useChat, {SaveChatType} from "@/hooks/ChatHook.ts";
import {Toaster} from "@/components/ui/toaster.tsx";
import {getChatRooms, imgUpload} from "@/services/Chat.ts";
import {useChatLogStore, useChatRoomStore} from "@/store/chatStore.ts";
import {Chat, ChatRoom, ChatType, User, UserType} from "@/types";
import dayjs from "dayjs";
import {SidebarComponent} from "@/page/chat/SidebarComponent.tsx";
import {ChatDialog} from "@/page/chat/ChatDialog.tsx";
import {ChatUserList} from "@/page/chat/ChatUserList.tsx";
import {ChatToast} from "@/page/chat/ChatToast.tsx";
import {useSSE} from "@/hooks/SSEHook.ts";
import {toast} from "@/hooks/use-toast.ts";
import {profile} from "@/services/Auth.ts";

const url = import.meta.env.VITE_BE_URL as string;

export const ChatComponent = () => {
  const [getRooms, setRooms] = useState<ChatRoom[]>([]);

  const inputRef = useRef<HTMLTextAreaElement | null>(null);
  const sendBtnRef = useRef<HTMLButtonElement | null>(null);
  const inputFileRef = useRef<HTMLInputElement | null>(null);

  const sidebarRef = useRef<HTMLDivElement | null>(null);
  const chatRoomList = useRef<HTMLDivElement | null>(null)

  const [isViewRoom, setViewRoom] = useState<boolean>(true);
  const [isViewList, setViewList] = useState<boolean>(false);

  const {chatMessages:getMessages,sendSocketMessage, userProfile, id} = useChat()
  const {setUserProfile} = useChatRoomStore();
  const {chatMessages, addMessage} = useChatLogStore();
  const messageEndRef = useRef<HTMLDivElement | null>(null);

  const {messages,latestData} = useSSE<{message:string}>({userCode:userProfile?.userCode,url:url+"sse"})

  useEffect(() => {
    profile("expert").then(value => {
      const data = value.data;
      setUserProfile({
        userCode:data.expertCode,
        nickname:data.name,
        profileImg:data.image
      })
    })
  }, []);

  useEffect(() => {
    if (messages.length > 0) {
      const latestMessage = messages[messages.length - 1];
      if (latestMessage?.data) {
        toast({
          title: "알림",
          description: latestMessage.data.message
        });
      }
    }
  }, [messages, toast]);

  useEffect(() => {
    messageEndRef.current!.scrollIntoView({ behavior: 'smooth' });
  }, [getMessages]);

  useEffect(() => {
    const divElement = sidebarRef.current;
    const chatRoomElement = chatRoomList.current;
    if (!divElement) return;
    if (!chatRoomElement) return;

    const handleResize = (entries) => {
      for (let entry of entries) {
        const width = entry.contentRect.width;
        if (width <= 120) { // 너비가 100px 이하일 때 특정 함수 호출
          chatRoomElement.classList.add('hidden');
        } else {
          chatRoomElement.classList.remove('hidden')
        }
      }
    };

    const observer = new ResizeObserver(handleResize);
    observer.observe(divElement);

    return () => {
      observer.disconnect();
    };
  }, []);

  useEffect(() => {

    getChatRooms().then((value:ChatRoom[]):void => {
      // console.log(value)
      setRooms(value);
      // console.log(getRooms)
    })
  },[])

  const sendMessage = () => {
    // addMessage({
    //   variant: 'sent',
    //   sender:'Me',
    //   message:inputRef.current!.value
    // })

    const content:Chat = {
      userType: UserType.User,
      msgType: ChatType.TEXT,
      profile: userProfile,
      msg: inputRef.current!.value,
      imgUrl: null,
      petMsg: null,
      date: new Date(),
    }

    addMessage(content)

    sendSocketMessage(content)

    inputRef.current!.value = "";
    sendBtnRef.current!.disabled = isInputEmpty(inputRef.current!.value);
  }

  const isInputEmpty = (value:string) => {
    return value.trim().length <= 0;
  }

  const handleChatInput = (event: ChangeEvent<HTMLTextAreaElement>) => {
    if (sendBtnRef.current !== null) {
      sendBtnRef.current!.disabled = isInputEmpty(event.target.value);
    }
  };

  const handleKeyPress = (event:KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === "Enter") {
      if (event.shiftKey) {
        return;
      } else {
        event.preventDefault();

        if (isInputEmpty(inputRef.current!.value)) return;
        sendMessage();
      }
    }
  }

  function isToday(date: dayjs.Dayjs): boolean {
    const now = dayjs();
    return date.isSame(now, 'day');
  }

  function isYesterday(date: dayjs.Dayjs): boolean {
    const now = dayjs();
    return date.isSame(now.subtract(1, 'day'), 'day');
  }

  function formatDate(date: string | Date): string {
    const inputDate = dayjs(date); // 입력된 날짜

    if (isToday(inputDate)) {
      return inputDate.format('오늘 A h:mm'); // 오늘 오후 2:42
    }

    if (isYesterday(inputDate)) {
      return inputDate.format('어제 A h:mm'); // 어제 오전 10:30
    }

    return inputDate.format('YYYY-MM-DD A h:mm'); // 20xx-xx-xx 오전 8:01
  }

  const renderChatBubbles = () => {
    return chatMessages.map((value: Chat, index: number) => {
      const variantType:"sent"|"received"=value.profile.userCode===userProfile.userCode?"sent":"received";

      switch (value.msgType) {
        case ChatType.TEXT: {
          return (
            <ChatBubble variant={variantType} key={index}>
              <ChatBubbleAvatar className="select-none" src={value.profile?.profileImg ?? ""} fallback={<LucideUser/>}/>

              <div className={`flex flex-col max-w-full ${variantType==="sent"?'items-end':null}`}>
                <div className={`flex font-bold max-w-3xl items-center truncate cursor-default ${variantType==='received' ?"justify-items-end":null}`}>
                  {
                    variantType==='received' ?
                      <>
                        <span>{value.profile?.nickname}</span>
                        <span className={`font-thin text-xs me-2 text-neutral-300 ml-2`}>{formatDate(value.date)}</span>
                      </>:(
                        <>
                          <span className={`font-thin text-xs me-2 text-neutral-300`}>{formatDate(value.date)}</span>
                          <span>{value.profile?.nickname}</span>
                        </>
                    )
                  }
                </div>
                <ChatBubbleMessage variant={variantType} className="w-fit">
                  {value.msg}
                </ChatBubbleMessage>
              </div>
            </ChatBubble>
          )
        }
        case ChatType.IMG: {
          return (
            <ChatBubble variant={variantType} key={index}>
              <ChatBubbleAvatar src={value.profile?.profileImg ?? ""} fallback={<LucideUser/>}/>
              <div className={`flex flex-col max-w-full ${variantType==="sent"?'items-end':null}`}>
                <div className={`flex font-bold max-w-3xl items-center truncate cursor-default ${variantType==='received' ?"justify-items-end":null}`}>
                  {
                    variantType==='received' ?
                      <>
                        <span>{value.profile?.nickname}</span>
                        <span className={`font-thin text-xs me-2 text-neutral-300 ml-2`}>{formatDate(value.date)}</span>
                      </>:(
                        <>
                          <span className={`font-thin text-xs me-2 text-neutral-300`}>{formatDate(value.date)}</span>
                          <span>{value.profile?.nickname}</span>
                        </>
                      )
                  }
                </div>
                <ChatBubbleMessage variant={variantType}>
                  <img src={value.imgUrl} alt="" className="rounded-lg"/>
                </ChatBubbleMessage>
              </div>
            </ChatBubble>
          )
        }
      }
    });
  }

  return(
    <div className="sm:container sm:mx-auto h-screen py-8">
      <main className="flex flex-row justify-center items-center h-full border rounded-lg">
        <SidebarComponent getRooms={getRooms} isViewRoom={isViewRoom}/>
        <div className="flex-grow flex flex-col h-full w-3/5">
          <div className="flex flex-row flex-1 max-h-full">
            <div className="sm:container flex flex-col flex-1 h-full">
              <div className="flex flex-none flex-row p-2 border-b">
                <div className="basis-1/2 content-center">
                  <Button variant="ghost" className="w-10 h-10 me-2" onClick={()=>setViewRoom(!isViewRoom)}>
                    <LucidePanelLeft/>
                  </Button>
                  <span className="font-bold text-lg truncate antialiased select-none">
                    테스트...
                  </span>
                </div>
                <div className="flex flex-row justify-end basis-1/2">

                  <TooltipProvider delayDuration={120}>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button variant="outline" className="md:w-10 md:h-10 rounded-2xl me-1">
                          <LucidePhone/>
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>음성통화</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>

                  <TooltipProvider delayDuration={120}>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button variant="outline" className="md:w-10 md:h-10 rounded-2xl me-1">
                          <LucidePawPrint/>
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>반려동물</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>

                  <Button variant={isViewList ? "default" : "outline"} className="md:w-10 md:h-10 rounded-2xl" onClick={()=>setViewList(!isViewList)}>
                    <LucideUser/>
                  </Button>
                </div>
              </div>
              <div className="flex grow flex-row max-h-full h-0">
                <ChatMessageList style={{scrollbarColor: "gray transparent"}} className="transition-all">
                  <ChatBubble variant={"sent"}>
                    <ChatBubbleAvatar fallback='US' />
                    <div className="flex flex-col max-w-full items-end">
                      <span className="font-bold max-w-36 truncate cursor-default">nickname</span>
                      <ChatBubbleMessage variant='sent' className="w-fit">
                        testakwmd;
                      </ChatBubbleMessage>
                    </div>
                  </ChatBubble>
                  <ChatBubble variant={"sent"}>
                    <ChatBubbleAvatar fallback='US' />
                    <ChatBubbleMessage variant='sent'>
                      <img className="rounded-lg" src="https://photo.coolenjoy.co.kr/data/editor/1911/thumb-Bimg_89d3d5a01d695c0b97a9fc6d4709a564_1qri.jpg" alt=""/>
                    </ChatBubbleMessage>
                  </ChatBubble>
                  {
                    renderChatBubbles()
                  }
                  <div ref={messageEndRef}></div>
                </ChatMessageList>
                <div className={`max-h-full transition-all duration-200 ease-in-out ${isViewList ? "border-l w-20" : "w-0"}`}>
                  <ChatUserList/>
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-row p-4 items-center border-t">
            <ChatDialog id={id}/>

            <ChatInput
              ref={inputRef}
              onChange={handleChatInput}
              onKeyDown={handleKeyPress}
              className="rounded-2xl min-h-0"
              placeholder="메시지 입력..."/>

            <Button ref={sendBtnRef} className="w-10 h-10 ml-2 rounded-2xl transition duration-150 ease-in-out" disabled={true}>
              <PaperPlaneIcon/>
            </Button>
          </div>
        </div>
      </main>
      <Toaster/>
    </div>
  )
}