import {useEffect, useState} from "react";
import {ExpertEntity, ExpertPublicEntity} from "@/components/user/props/ExpertProps.ts";
import {axiosGet} from "@/util/axiosData.ts";
import {migHost} from "@/util/apiInof.ts";

export const useExpertInfo = () => {

    const [profile, setProfile] = useState<ExpertEntity>()
    const [publicProfile, setPublicProfile] = useState<ExpertPublicEntity>()

    useEffect(() => {
        console.log(`useExpertInfo()`)
        axiosGet(`${migHost()}expert`).then((data) => {
            console.log(data)

            setProfile(data?.data)
            setPublicProfile(data?.data.profile)
        }).catch((error) => {
            console.error("Error fetching expert info:", error);
        })
    }, []);

    return {profile, publicProfile}
}