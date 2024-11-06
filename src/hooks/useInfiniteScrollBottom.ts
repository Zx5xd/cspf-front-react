import { useEffect, useState, useCallback } from 'react';

export const useInfiniteScrollBottom = (callback: (page: number) => void) => {
    const [isFetching, setIsFetching] = useState(false);
    const [page, setPage] = useState<number>(1);

    const handleScroll = useCallback(() => {

        if (window.innerHeight + document.documentElement.scrollTop >= document.documentElement.offsetHeight - 5 && !isFetching) {
            setIsFetching(true);
        }

    }, [isFetching]);

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [handleScroll]);

    useEffect(() => {
        if (!isFetching) return;
        callback(page); // 페이지 번호와 함께 callback 호출
        setIsFetching(false);
        setPage((prevPage) => prevPage + 1); // 페이지 번호 증가
    }, [isFetching, callback, page]);

    return [isFetching, page] as const;
};
