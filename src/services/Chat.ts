import axios, {AxiosResponse} from "axios"
import {ChatRoom} from "@/types";

const baseUrl = import.meta.env.VITE_BE_URL

export const getChatRooms = async ():Promise<ChatRoom[]> => {
  return axios({
    baseURL: baseUrl,
    url: '/chatRoom/user/access',
    method: 'get',
    withCredentials: true
  }).then((value:AxiosResponse) => {
    return value.data.content
  })
}

export const imgUpload = async (roomId:string, formData:FormData) => {
  return axios({
    baseURL: baseUrl,
    url: `/images/chat`,
    params:{
      roomId,
    },
    method: 'post',
    headers:{
      "Content-Type": "multipart/form-data"
    },
    transformRequest: [
      () => {
        return formData;
      }
    ],
    withCredentials: true
  })
}
export const reqChat = (url:string) => {
  return axios({
    baseURL: baseUrl,
    url:`/${url}/cnt`,
    method:'get',
    withCredentials: true
  }).then(value => value.data)
}
