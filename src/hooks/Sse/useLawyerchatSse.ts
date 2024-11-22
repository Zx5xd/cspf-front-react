import { migHost } from '@/util/apiInof.ts'

export const useLawyerchatSse = () => {
  let eventSource: any

  const startListening = () => {
    // EventSource 초기화

    console.log('SSe start')

    eventSource = new EventSource(`${migHost()}sse`, {
      withCredentials: true,
    })

    eventSource.addEventListener('chat_created', (e) => {
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
