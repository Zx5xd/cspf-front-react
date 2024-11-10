import { useEffect, useState, useCallback, useRef } from 'react';

const debounce = (func: (...args: any[]) => void, delay: number) => {
  let timer: NodeJS.Timeout;
  return (...args: any[]) => {
    clearTimeout(timer);
    timer = setTimeout(() => func(...args), delay);
  };
};

export const useInfiniteScrollTop = (
  callback: (page: number) => void,
  scrollContainerRef: React.RefObject<HTMLElement>,
  initialLoadComplete: boolean,
  totalPages: number
) => {
  const [isFetching, setIsFetching] = useState(false);
  const [page, setPage] = useState<number>(2) // 첫 로드는 이미 완료했으므로 2부터 시작
  const delay = 500

  const handleScroll = useCallback(
    debounce(() => {
      if (scrollContainerRef.current && scrollContainerRef.current.scrollTop <= 5 && !isFetching && initialLoadComplete) {
        setIsFetching(true);
      }
    }, delay),
    [isFetching, scrollContainerRef, delay, initialLoadComplete]
  );

  useEffect(() => {
    if(page > totalPages){
      console.log(page, totalPages)
      return () => {
        console.log('The End')
      }
    } else{
      const scrollContainer = scrollContainerRef.current;
      if (scrollContainer) {
        scrollContainer.addEventListener('scroll', handleScroll);
      }
      return () => {
        if (scrollContainer) {
          scrollContainer.removeEventListener('scroll', handleScroll);
        }
      };
    }

  }, [handleScroll, scrollContainerRef]);

  useEffect(() => {
    if (!isFetching || !initialLoadComplete) return;
    callback(page);
    setIsFetching(false);
    setPage((prevPage) => prevPage + 1);
  }, [isFetching, callback, initialLoadComplete]);

  return { isFetching, page, setPage } as const;
};
