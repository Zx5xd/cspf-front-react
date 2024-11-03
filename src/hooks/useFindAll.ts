import {axiosGet} from "../util/axiosData.ts";
import {QuestionsManageProps} from "../components/user/props/AdminProps.ts";
import {useEffect, useState} from "react";
import {migHost} from "../util/apiInof.ts";

export const useFindAll =() => {
    const [forum, setForum] = useState<QuestionsManageProps[]>([]);
    const [open, setOpen] = useState<{[key:number]: boolean}>({});

    const questionFindAll = () => {
        axiosGet(`${migHost()}questions`).then((data) => {
            const quesList = data && data.data;
            setForum(quesList.data || []);

            const initialOpenStates = quesList.reduce((acc: { [key: number]: boolean }, item: QuestionsManageProps) => {
                acc[item.id] = false;
                return acc;
            }, {});

            setOpen(initialOpenStates);
        });
    }

    useEffect(() => {
        questionFindAll()
    }, [])

    return { forum ,open, setOpen}
}
