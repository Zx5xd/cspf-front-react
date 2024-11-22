import {LawyerChatList} from "@/page/expert/reqChat/LawyerChatList.tsx";
import {ReqLawyerChatList} from "@/page/expert/reqChat/ReqLawyerChatList.tsx";
import {SideMenubar} from "@/page/expert/sideMenubar.tsx";
import * as React from "react";

export const LawReqChatLayout = () =>
{
    return(
        <>
            <div className={"sm:container sm:mx-auto h-screen py-8"}>
                <main className="flex flex-row h-full overflow-hidden">
                    <SideMenubar/>
                    <div className="flex flex-col w-full h-full overflow-hidden">
                        <ReqLawyerChatList/>
                        <LawyerChatList/>
                    </div>
                </main>
            </div>
        </>
)
}