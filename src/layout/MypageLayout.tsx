import {SideMenubar} from "@/page/expert/sideMenubar.tsx";
import {ScrollArea} from "@/components/ui/scroll-area.tsx";
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card.tsx";
import {Label} from "@/components/ui/label.tsx";
import {Input} from "@/components/ui/input.tsx";
import {Button} from "@/components/ui/button.tsx";
import {Textarea} from "@/components/ui/textarea.tsx";
import * as React from "react";
import {useExpertStore} from "@/store/useExpertStore.ts";
import {useNavigate} from "react-router-dom";
import {PrivateInfo} from "@/page/expert/mypage/privateInfo.tsx";
import {PublicInfo} from "@/page/expert/mypage/publicInfo.tsx";
import {useEffect} from "react";
import {expertProfile} from "@/services/UserInfo.ts";

export const MypageLayout = () => {
    const navigate = useNavigate()
    const {setExpert, clearExpert} = useExpertStore()

    const updateProfile = async () => {
        await expertProfile().then(data => {
            console.log(data)
            clearExpert()
            setExpert(data)
        })
    }

    useEffect(() => {
        updateProfile
    }, []);

    return (
        <div className={"sm:container sm:mx-auto h-screen py-8"}>
            <main className="flex flex-row h-full  overflow-hidden">
                <SideMenubar/>
                <ScrollArea className="h-screen w-2/3 ">
                    <div className="container mx-6 bg-white/5 rounded-lg p-6 space-y-8 w-3/4">
                        <h1 className="text-3xl font-bold">마이페이지</h1>
                        <PrivateInfo />
                        <PublicInfo />
                    </div>
                </ScrollArea>
            </main>
        </div>
    )
}