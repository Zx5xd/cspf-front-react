import axios, {AxiosResponse} from "axios";
import {expertInfo} from "@/services/UserInfo.ts";
import {ExpertEntity} from "@/types/entity.ts";

const baseUrl = import.meta.env.VITE_BE_URL;

export const chatBlackList = () => {
    return axios({
        method: 'get',
        baseURL: baseUrl,
        url: '/chatComplaint/compList',
        withCredentials: true
    }).then(value => value.data)
}

export const userInfoUpdate = (updateInfo:any) => {
    return axios({
        method: 'PUT',
        baseURL:baseUrl,
        headers: {
            'Content-Type': 'application/json',
        },
        url:`user`,
        data:JSON.stringify(updateInfo),
        withCredentials: true
    }).then(value => value.data)
}

export const userInfoDelete = (deleteInfo:string) => {
    return axios({
        method: 'delete',
        baseURL: baseUrl,
        url:`user/${deleteInfo}`,
        withCredentials: true
    }).then(value => value.data)
}

export const expertInfoUpdate = (updateInfo:any) => {
    return axios({
        method: 'PATCH',
        baseURL:baseUrl,
        headers: {
            'Content-Type': 'application/json',
        },
        url:`expert/${updateInfo.expertCode}`,
        data:JSON.stringify(updateInfo),
        withCredentials: true
    })
}

export const expertInfoDelete = (deleteInfo:string) => {
    return axios({
        method: 'delete',
        baseURL: baseUrl,
        url:`expert/${deleteInfo}`,
        withCredentials: true
    }).then(value => value.data)
}

export const expertGetSearch = (url:string, param?:string, data?:any) => {
    return axios({
        method:'get',
        baseURL:baseUrl,
        url:url+'/',
        data:data,
        withCredentials: true
    }).then(data => data.data)
}

export const expertPatchAnything = (url:string, data?:any) => {
    return axios({
        method: 'patch',
        baseURL:baseUrl,
        url:url,
        data:data,
        withCredentials: true
    }).then(data => data.data)
}