import { useEffect, useState } from 'react';
import { fetchData, parseJSON } from '../util/fetchData';
import { migHost } from "../util/apiInof.ts";
import { useInfiniteScrollBottom } from "@/hooks/useInfiniteScrollBottom.ts";

interface CommonListProps<T> {
    types: string;
    dataMapper: (data: any) => T[];
    render: (items: T[]) => JSX.Element;
}

export const CommonList = <T,>({ types, dataMapper, render }: CommonListProps<T>) => {
    const [items, setItems] = useState<T[]>([]);
    const host = migHost();
    let url: string;
    let query: string | null;

    if (types !== 'aniInfo') {
        const queryString = window.location.search;
        const urlParam = new URLSearchParams(queryString);
        query = urlParam.get('query');
        url = `${host}${types}?query=${query}`;
    } else {
        query = "null";
        url = `${host}${types}`;
    }

    const fetchDataAsync = async (page: number) => {
        try {
            console.log(`Fetching data for page: ${page}`);
            const data = await fetchData(`${url}&page=${page}`);
            let mappedItems: T[];

            if (types !== 'aniInfo') {
                const parsedData = parseJSON(data);
                console.log('parsedData',parsedData)
                mappedItems = dataMapper(parsedData);
            } else {
                mappedItems = dataMapper(JSON.stringify(data.body));
            }

            // 중첩 없이 데이터 병합
            setItems((prevItems) => [...prevItems, ...mappedItems]);
        } catch (error) {
            console.error('Error processing data:', error);
        }
    };

    const [isFetching, page] = useInfiniteScrollBottom(fetchDataAsync);

    useEffect(() => {
        fetchDataAsync(page); // 초기 데이터 로드
    }, [url, query, dataMapper]);

    return (
      <div>
          {render(items)}
          {isFetching && <p>Loading more items...</p>}
      </div>
    );
};
