// import {urlProp} from "../components/forum/PropInterface";


// @ts-ignore
import {setCookie, getCookie} from "./cookie.ts";
import {useEffect} from "react";


export const fetchUrl = async (url: string, json: string): Promise<string> => {
    // 뉴스 스크리핑 함수


    try{
        const res = await fetch(url, {
            method: 'POST',
            headers: new Headers({ 'Content-Type': 'application/json' }),
            body: json,
            credentials: 'include',
        }).catch(error => {throw new Error(`error: ${error}, \n status: ${res.statusText}`)});

        return await res.text();
    }catch (error) {
        console.log(error);
        throw error;
    }
}

export const putFetch = async (url: string, json: string): Promise<any> => {
    try{
        await fetch(url, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(json),
        }).then(data => {return data.statusText;});
    }catch (error) {
        console.log(error);
        throw error;
    }

}

export const fetchData = async (url: string) => {
    try {
        console.log(`fetching data from ${url}`);
        const response = await fetch(url,{
            credentials: 'include'
        });
        const data = await response.json();
        return data;
    } catch (error) {
        console.error(`Error fetching data from ${url}:`, error);
        throw error;
    }
};

export const parseJSON = (data: any) => {
    try {
        return JSON.parse(data);
    } catch (error) {
        console.error('Failed to parse JSON:', error);
        throw error;
    }
};
