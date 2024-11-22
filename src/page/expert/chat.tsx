import {Button} from "@/components/ui/button.tsx";
import {DataTable} from "@/page/admin/user/data-table.tsx";
import {columns} from "@/page/admin/user/Columns.tsx";
import React from "react";
import {useNavigate} from "react-router-dom";
import {ChatComponent} from "@/page/chat/Chat.tsx";
import {SideMenubar} from "@/page/expert/sideMenubar.tsx";

export const ChatPage = () => {
    const navigate = useNavigate();

    return (
        <div className={"sm:container sm:mx-auto h-screen"}>
            <main className="flex flex-row h-full overflow-hidden">
                <div className={'py-8'}>
                <SideMenubar />
                </div>
                    <ChatComponent/>
            </main>
        </div>
    )
}