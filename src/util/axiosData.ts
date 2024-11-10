import axios from "axios";
import {getCookie, setCookie} from "./cookie.ts";
import {migHost} from "@/util/apiInof.ts";

export const axiosLogin = async (url: string, data: any, option?: string) => {
  return await axios.post(url, data, {
    headers:
      {
        'Content-Type': 'application/json',
      },
    withCredentials: true
  });
}

export const axiosPost = async (url: string, data: any, option?: string) => {
   console.log('axiosPost',getCookie("authorization"));
    return await axios.post(url, data, {
       headers:
           {
               'Content-Type': 'application/json',
           },
       withCredentials: true
   });
}

export const axiosImagePost = async (url: string, data: any) => {
    try{
    return await axios.post(url, data, {
        headers:
            {
                'Content-Type': 'multipart/form-data',
            },
        withCredentials: true
    });
    }catch (error) { console.log(error); }
}

export const axiosPatch = async (url: string, data: any) => {
   try{
   return await axios.patch(url,data,{
        headers: {
            'Content-Type': 'application/json'
        },
        withCredentials: true
    });
   }catch (error) { console.log(error); }
}

export const axiosGet = async (url: string, data?: any | null) => {
    try{
        return await axios.get(url, {
            params: data,
            withCredentials: true,
        });
    }catch (error) { console.log(error); }
}

export const axiosDelete = async (url: string) => {
    try {
        return await axios.delete(url, {
            withCredentials: true,
        });
    } catch (error) {
        console.log(error);
    }
}

export const axiosUserInfo = async () => {
    try{
        return await axios.get(`${migHost()}user/profile`, {
            withCredentials: true,
        });
    }catch (error) { console.log(error); }
}