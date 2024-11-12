import { useExpertInfo } from '@/store/useExpertStore.ts'
import { useEffect, useState } from 'react'
import { migHost } from '@/util/apiInof.ts'
import { axiosGet, axiosPatch } from '@/util/axiosData.ts'

export interface reqLawyerIntface {
  lawChatReqId: number
  reqDate: string
  prefTime: string
  description: string
  reqStatus: number
  createdAt: string
  cancledAt: string
  ownerCode: {
    name: string
  }
  lawyerId: string
}

export interface reqInsurerInterface {
  insChatReqNumber: number
  insurerId: string
  ownerCode: {
    name: string
  }
  petCode: {
    kindNm: string
    Birthday: string
  }
  createdAt: string
}

export const useChatReqManage = () => {
  const user = useExpertInfo()
  const [reqCnt, setReqCnt] = useState<number | null>(null)
  const [reqLawChatList, setReqLawChatList] = useState<reqLawyerIntface[]>([])
  const [reqInsChatList, setReqInsChatList] = useState<reqInsurerInterface[]>(
    []
  )

  const linkType =
    user?.expertCode?.charAt(0) === 'L' ? 'lawyerchat' : 'insurerchat'

  useEffect(() => {
    axiosGet(`${migHost()}${linkType}/cnt`).then((data) => {
      setReqCnt(data && data.data)
    })

    axiosGet(`${migHost()}${linkType}`).then((data) => {
      console.log(data.data)
      if (linkType === 'lawyerchat') {
        setReqLawChatList(data.data)
      } else {
        setReqInsChatList(data.data)
      }
    })
  }, [])

  const denyChat = (id: number, lawyer: reqLawyerIntface) => {
    axiosPatch(`${migHost()}${linkType}/commit/${id}`, {
      lawyerCode: lawyer.lawyerId,
      reqStatus: 9,
    }).then((data) => {
      console.log('채팅 거부', data)
    })
  }

  const commitChat = (id: number) => {
    axiosGet(`${migHost()}${linkType}/commit/${id}`).then((data) => {
      console.log('방 생성 완료', data)
    })
  }

  return {
    reqCnt,
    reqLawChatList,
    reqInsChatList,
    denyChat,
    commitChat,
  }
}
