import axios, {AxiosResponse} from "axios";
import {UserEntity} from "@/types/entity.ts";

const baseUrl = import.meta.env.VITE_BE_URL

export const userInfo = async ():Promise<UserEntity[]> => {
    return axios({
        baseURL: baseUrl,
        url: '/user',
        method: 'get',
        withCredentials: true
    }).then((value:AxiosResponse) => {return value.data});
}

export const expertInfo = () => {
   return axios({
        baseURL: baseUrl,
        url: '/expert/findAll',
        method: 'get',
        withCredentials: true
    }).then(value => value.data)
}

export const expertProfile = () => {
    return axios({
        baseURL: baseUrl,
        url: '/expert',
        method: 'get',
        withCredentials: true
    }).then(value => value.data)
}