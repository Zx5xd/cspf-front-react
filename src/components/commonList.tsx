import { useEffect, useState } from 'react';
import { fetchData, parseJSON } from '../util/fetchData';
import {migHost} from "../util/apiInof.ts";

interface CommonListProps<T> {
    types: string;
    dataMapper: (data: any) => T[];
    render: (items: T[]) => JSX.Element;
}

export const CommonList = <T,>({ types, dataMapper, render }: CommonListProps<T>) => {
    console.log(`commonList`, types, dataMapper, render);

    const [items, setItems] = useState<T[]>([]);
    const host = migHost()
        // import.meta.env.VITE_LOCAL_HOST;
    console.log(`CommonList host : ${host}`);

    let url : string;
    let query : string | null;

    if(types !== 'aniInfo'){
        const queryString = window.location.search;
        const urlParam = new URLSearchParams(queryString);
        query = urlParam.get('query');
        url = host+types+`?query=`+query;
    } else{
         query = "null";
         url = host+types;
    }


    useEffect(() => {
        const fetchDataAsync = async () => {
            try {
                console.log('fetchDataAsync');
                const data = await fetchData(url);
                let mappedItems:any;
                if(types !== 'aniInfo'){
                    const parsedData = parseJSON(data);
                    console.log(`parsedData: ${JSON.stringify(parsedData)}`);
                    mappedItems = dataMapper(parsedData);
                } else {
                    console.log(`aniInfo Data : ${JSON.stringify(data.body)}`);
                    mappedItems = dataMapper(JSON.stringify(data.body));
                }
                setItems(mappedItems);
            } catch (error) {
                console.error('Error processing data:', error);
            }
        };

        fetchDataAsync();
    }, [url, query, dataMapper]);

    return render(items);
};
