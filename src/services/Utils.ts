import axios from "axios";
import {ExpertEntity} from "@/types/entity.ts";
import {EmailType} from "@/types/mail.ts";

const baseUrl = import.meta.env.VITE_BE_URL;

export const sendMail = (status: EmailType, expert: ExpertEntity) => {
    axios({
        baseURL:baseUrl,
        method:'get',
        url:`/mail/${status}`,
        data:expert,
        withCredentials:true
    })
}

export const visionCert = (img:string) => {
    return axios({
        method:'post',
        baseURL:baseUrl,
        url:'/imgextract/certVision',
        data:JSON.stringify(img),
        withCredentials:true
    }).then(data => data.data)
}

export const searchNews = (query: string, page:number) => {
    return axios({
        method:'get',
        baseURL:baseUrl,
        url: '/searchNews?query='+query+'&page='+page,
        withCredentials: true
    }).then(data => data.data)
}

export const newsScrip = (url: string) => {
    return axios({
        method: 'post',
        headers: {
            "Content-Type": "application/json",
        },
        baseURL: baseUrl,
        url:'/scrip/news',
        data: {url: url},
        withCredentials: true
    }).then(data => data.data)
}

export const searchPrecedent = (query: string, page:number) => {
    return axios({
        method:'get',
        baseURL:baseUrl,
        url: '/caseLaw?query='+query+'&page='+page,
        withCredentials: true
    }).then(data => data.data)
}