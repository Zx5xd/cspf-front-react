import {useEffect, useState} from "react";
import {axiosGet} from "../../util/axiosData.ts";
import {MessageCompaintProp} from "../../components/chat/chatInterface.ts";
import {migHost} from "../../util/apiInof.ts";

export const ChatComplaint:React.FC = () => {

    const [chatComps, setChatComps] = useState<MessageCompaintProp[]>([]);

    const cspfLocal = migHost()
        // import.meta.env.VITE_LOCAL_HOST;

    useEffect(() => {
        axiosGet(`${cspfLocal}chatComplaint/compList`).then((data) => {
            console.log(data.data)

            setChatComps(data?.data);
        })
    }, []);

    return(
        <>

        </>
    )
}