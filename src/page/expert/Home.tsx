import {Button} from "@/components/ui/button.tsx";
import {ExpertDataTable} from "@/page/expert/data-table.tsx";
import {quesBoardColumns} from "@/page/expert/question/Columns.tsx";
import React, {useEffect, useState} from "react";
import {Outlet, useNavigate} from "react-router-dom";
import {expertProfile} from "@/services/UserInfo.ts";
import {useExpertStore} from "@/store/useExpertStore.ts";
import {ExpertEntity} from "@/types/entity.ts";
import {SideMenubar} from "@/page/expert/sideMenubar.tsx";

export const Home = () => {
    const navigate = useNavigate();
    return (
        <div className={"sm:container sm:mx-auto  h-screen py-8"}>
            <main className="flex flex-row h-full bg-white/5 overflow-hidden">
                <SideMenubar />
            </main>
        </div>
    )
}