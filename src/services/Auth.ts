import axios from "axios";
import https from 'https';

const backendUrl:string = import.meta.env.VITE_BE_URL as string;

export const login = async (type:'admin'|'expert'|'user', credentials:{username:string,password:string}) => {
  return axios({
    baseURL: backendUrl, // 프록시를 사용하므로 '/api'로 기본 URL 변경
    url: type === 'user' ? `auth/login` : `auth/login/${type}`,
    method: 'post',
    responseType: 'json',
    data: credentials,
    withCredentials: true
  });
}

export const profile = async (type:'expert'|'user') => {
  return axios({
    baseURL: backendUrl,
    url: type === 'user' ? 'user/simple_profile': 'expert/simple_profile',
    method: 'get',
    withCredentials: true
  })
}