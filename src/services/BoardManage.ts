import axios from "axios";

const backendUrl:string = import.meta.env.VITE_BE_URL as string;

export const BoardWrite = (url:string, data?:any, param?: string) => {
    const finalUrl = param ? url+'/'+param : url
    return axios({
        method:'post',
        baseURL:backendUrl,
        url:finalUrl,
        data:data,
        withCredentials:true
    }).then(data => data.data)
}

export const findBoardAnyThings = (url:string, param?:string, data?:any) => {
    return axios({
        method:'Get',
        baseURL:backendUrl,
        url:url+'/'+param,
        data:data,
        withCredentials:true
    }).then(data => data.data)
}

export const BoardUpdate = (url:string, param?:number, data?:any) => {
    return axios({
        method:'patch',
        baseURL:backendUrl,
        url:url+'/'+param,
        data:data,
        withCredentials:true
    }).then(data => data.data)
}

export const BoardDelete = (url:string, param?:string) => {
    return axios({
        method:'delete',
        baseURL:backendUrl,
        url:url+'/'+param,
        withCredentials:true
    })
}