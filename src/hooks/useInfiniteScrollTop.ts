import { useEffect, useState, useCallback } from 'react';

const debounce = (func: (...any:any[]) => void, delay: number) => {
    let timer: NodeJS.Timeout;
    return (...args: any[]) => {
        clearTimeout(timer);
        timer = setTimeout(() => func(...args), delay);
    };
};

export const useInfiniteScrollTop = (
  callback: (page: number) => void,
  scrollContainerRef: React.RefObject<HTMLElement>,
  delay:number
) => {
    const [isFetching, setIsFetching] = useState(false);
    const [page, setPage] = useState<number>(1);

    const handleScroll = useCallback(
      debounce(() => {
          if (scrollContainerRef.current && scrollContainerRef.current.scrollTop <= 5 && !isFetching) {
              setIsFetching(true);
          }
      }, delay),
      [isFetching, scrollContainerRef, delay]
    );

    useEffect(() => {
        const scrollContainer = scrollContainerRef.current;
        if (scrollContainer) {
            scrollContainer.addEventListener('scroll', handleScroll);
        }
        return () => {
            if (scrollContainer) {
                scrollContainer.removeEventListener('scroll', handleScroll);
            }
        };
    }, [handleScroll, scrollContainerRef]);

    useEffect(() => {

            if (!isFetching) return;
            setPage(prevPage => prevPage + 1);
            callback(page);
            setIsFetching(false);
    }, [isFetching, callback]);

    return { isFetching, page, setPage } as const;
};
