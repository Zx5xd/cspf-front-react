import { useEffect, useState } from 'react';

interface UseSSEProps {
  userCode: string; // SSE 연결을 위한 userCode
  url: string; // SSE 서버 URL (예: http://localhost:3000/sse)
}

interface SSEMessage<T> {
  data: T;
  event?: string;
  id?: string;
}

export const useSSE = <T>({ userCode, url }: UseSSEProps) => {
  const [eventSource, setEventSource] = useState<EventSource | null>(null);
  const [messages, setMessages] = useState<SSEMessage<T>[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [latestData, setLatestData] = useState<T | null>(null);

  useEffect(() => {
    if (!userCode) return;

    const source = new EventSource(`${url}/${userCode}`, { withCredentials: true });
    setEventSource(source);

    source.addEventListener("request", (event) => {
      try {
        const parsedData: T = JSON.parse(event.data);
        setMessages((prev) => {
          const updatedMessages = [...prev, { data: parsedData }];
          return updatedMessages.slice(-5); // 마지막 5개의 항목만 유지
        });
        setLatestData(parsedData);
      } catch (err) {
        console.error('Failed to parse SSE data:', event.data);
      }
    });

    source.onerror = () => {
      setError('SSE connection error');
      source.close();
    };

    // 컴포넌트 언마운트 시 EventSource 연결 종료
    return () => {
      source.close();
    };
  }, [userCode, url]);

  return { messages, latestData, error };
};
