import styled from "styled-components";
import {Avatar, AvatarFallback} from "@/components/ui/avatar.tsx";


const ScrollDiv = styled.div`
  scrollbar-color: gray transparent;
`

export const ChatUserList = () => {

  const test = () => {
    let test = []

    for(let i = 0; i < 16; i++) {
      test.push(
        <div className="group hover:bg-neutral-700 cursor-pointer rounded-xl flex items-center justify-center content-center w-12 h-12" key={i}>
          <Avatar className="m-2 select-none">
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        </div>
      )
    }

    return test;
  }

  return(
    <ScrollDiv className="flex flex-col items-center h-full overflow-x-hidden overflow-y-auto pt-2">
      {test()}
    </ScrollDiv>
  )
}