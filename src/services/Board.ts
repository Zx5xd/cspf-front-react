import axios from "axios";

const baseUrl = import.meta.env.VITE_BE_URL

export const questionList = () => {
   return axios({
        baseURL: baseUrl,
        url:'/questions',
        method: 'get',
        withCredentials: true,
    }).then(data => data.data)
}

export const announceList = () => {
   return axios({
        baseURL: baseUrl,
        url:'/announcement/pages',
        method: 'get',
        withCredentials: true,
    }).then(data => data.data)
}