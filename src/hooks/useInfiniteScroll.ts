import { useEffect, useState, useCallback } from 'react';

export const useInfiniteScroll = (callback: () => void) => {
    const [isFetching, setIsFetching] = useState(false);

    const handleScroll = useCallback(() => {
        if (window.innerHeight + document.documentElement.scrollTop !== document.documentElement.offsetHeight || isFetching) return;
        setIsFetching(true);
    }, [isFetching]);

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [handleScroll]);

    useEffect(() => {
        if (!isFetching) return;
        callback();
    }, [isFetching, callback]);

    useEffect(() => {
        if (!isFetching) return;
        setIsFetching(false);
    }, [isFetching]);

    return [isFetching, setIsFetching];
}

export default useInfiniteScroll;
