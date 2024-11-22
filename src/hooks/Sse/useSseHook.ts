import {useExpertStore} from "@/store/useExpertStore.ts";

export const useSseHook = () => {
  let eventSource: any
  const {expert}= useExpertStore()

  const startListening = () => {
    // EventSource 초기화

    const baseUrl = import.meta.env.VITE_BE_URL
    console.log('SSe start')

    eventSource = new EventSource(`${baseUrl}sse/${expert.expertCode}`, {
      withCredentials: true,
    })

    eventSource.addEventListener('chat_created', (e) => {
      console.log(e.data)
      alert(e.data)
    })

    eventSource.addEventListener('request', (e) => {
      console.log(e.data)
      alert(e.data)
    })
  }

  const stopListening = () => {
    if (eventSource) {
      eventSource.close() // 연결 종료
      console.log('EventSource connection closed.')
    }
  }

  return { startListening, stopListening }
}
