import { useExpertInfo } from '@/store/useExpertStore.ts'
import { useEffect, useState } from 'react'
import { migHost } from '@/util/apiInof.ts'
import { axiosGet, axiosPatch } from '@/util/axiosData.ts'
import {reqChat} from "@/services/Chat.ts";
import {expertGetSearch, expertPatchAnything} from "@/services/UserManage.ts";

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
  owner: {
    name: string
  }
  pet: {
    kindNm: string
    Birthday: string
  }
  createdAt: string
  reqStatus: number
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
    reqChat(linkType).then((data) => {
      console.log(data)
      setReqCnt(data)
    })

    // axiosGet(`${migHost()}${linkType}/cnt`).then((data) => {
    //   setReqCnt(data && data.data)
    // })

    expertGetSearch(linkType).then((data) => {
      // console.log(data)
      if (linkType === 'lawyerchat') {
        // console.log(data)
        setReqLawChatList(data)
      } else {
        // console.log(data.data)
        setReqInsChatList(data)
      }
    })

    // axiosGet(`${migHost()}${linkType}`).then((data) => {
    //   console.log(data.data)
    //
    //   if (linkType === 'lawyerchat') {
    //     setReqLawChatList(data.data)
    //   } else {
    //     console.log(data.data)
    //     setReqInsChatList(data.data)
    //   }
    // })
  }, [])

  const denyChat = (id: number) => {

    expertPatchAnything(`${linkType}/${id}`, {
      reqStatus: 9,
    }).then((data) => {
      console.log('채팅 거부', data)
    })

    // axiosPatch(`${migHost()}${linkType}/${id}`, {
    //   reqStatus: 9,
    // }).then((data) => {
    //   console.log('채팅 거부', data)
    // })
  }

  const commitChat = (id: number) => {
    expertGetSearch(`${linkType}/commit/${id}`).then((data) => {
      console.log('채팅 성공', data)
    })

    // axiosGet(`${migHost()}${linkType}/commit/${id}`).then((data) => {
    //   console.log('방 생성 완료', data)
    // })
  }

  return {
    reqCnt,
    reqLawChatList,
    reqInsChatList,
    denyChat,
    commitChat,
  }

}