import React from 'react'
import { MessageProp } from '@/components/chat/chatInterface.ts'
import { useExpertStore } from '@/store/useExpertStore.ts'

interface msgMapProp {
  messages: MessageProp[]
}

export const ChatMsgMap: React.FC<msgMapProp> = ({ messages }) => {
  const expertInfo = useExpertStore()
  return messages.map((msg, index) => {
    console.log(
      `sender: ${msg.sender}, userCode: ${expertInfo.expert?.expertCode}`
    )
    return msg.sender === expertInfo.expert?.expertCode ? (
      <div className='ps-5' key={`msg-${index}`}>
        <div className='p-2 rounded-lg max-w-xs bg-blue-500 text-white self-start'>
          {msg.message || <img src={msg.src} alt='..이미지' />}
        </div>
      </div>
    ) : (
      <div className='pe-5' key={`msg-${index}`}>
        <div className='p-2 rounded-lg max-w-xs bg-gray-200 text-gray-900 self-end'>
          {msg.message || <img src={msg.src} alt='..이미지' />}
        </div>
      </div>
    )
  })
}
