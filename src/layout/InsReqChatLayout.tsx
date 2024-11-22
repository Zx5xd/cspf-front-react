import {LawyerChatList} from "@/page/expert/reqChat/LawyerChatList.tsx";
import {ReqLawyerChatList} from "@/page/expert/reqChat/ReqLawyerChatList.tsx";
import {SideMenubar} from "@/page/expert/sideMenubar.tsx";
import * as React from "react";
import {ReqInsurerChatList} from "@/page/expert/reqChat/ReqInsurerChatList.tsx";
import {InsurerChatList} from "@/page/expert/reqChat/InsurerChatList.tsx";

export const InsReqChatLayout = () =>
{
    return(
        <>
            <div className="sm:container sm:mx-auto h-screen py-8">
                <main className="flex flex-row h-full overflow-hidden">
                    <SideMenubar/>
                    <div className="flex flex-col w-full h-full overflow-hidden">
                        <ReqInsurerChatList/>
                        <InsurerChatList/>
                        {/*<div className="flex-grow overflow-auto">*/}
                        {/*    <ReqInsurerChatList/>*/}
                        {/*</div>*/}
                        {/*<div className="flex-grow overflow-auto border-t border-gray-300">*/}
                        {/*    <InsurerChatList/>*/}
                        {/*</div>*/}
                    </div>
                </main>
            </div>
        </>
    )
}