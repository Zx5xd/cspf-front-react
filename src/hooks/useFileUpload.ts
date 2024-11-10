import React, { useRef } from 'react';
import axios from 'axios';
import {migHost} from "@/util/apiInof.ts";
import {axiosImagePost} from "@/util/axiosData.ts";

const useFileUpload = (roomId: string) => {
    const fileInputRef = useRef<HTMLInputElement>(null);
    let isImage = false;

    // 파일 선택 창을 여는 함수
    const triggerFileSelect = () => {
        fileInputRef.current?.click();
    };

    const isImageFile = (file: File) => {
        return file.type.startsWith('image/');
    };

    // 파일 선택 후 서버로 파일 전송하는 함수
    const ChatFileSend = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files;
        if (files && files.length > 0) {
            const formData = new FormData();
            Array.from(files).forEach((file) => {
                isImageFile(file) ? (
                console.log('이미지 파일 전송', file),
                    isImage = true
                ) : (
                    console.log('파일 전송', file)
                )
                formData.append("files", file)
            });

            try {
                if(isImage) {
                    axiosImagePost(`${migHost()}images/${roomId}`, formData).then((data)=>{
                        if (data?.status === 201) {
                            console.log('이미지 파일 업로드 성공:', data);
                        } else {
                            console.log('이미지 파일 업로드 실패', data?.status);
                        }
                    })
                }else{
                    // File Upload URL

                    // await axios.post(`${migHost()}/images/${roomId}`, formData, {
                    //     headers: { 'Content-Type': 'multipart/form-data' },
                    // }).then((data)=>{
                    //     if (data.status === 201) {
                    //         console.log('이미지 파일 업로드 성공:', data);
                    //     } else {
                    //         console.log('이미지 파일 업로드 실패', data.status);
                    //     }
                    // })
                }


            } catch (error) {
                console.error('파일 업로드 실패:', error);
            }
        }
    };

    return { fileInputRef, triggerFileSelect, ChatFileSend };
};

export default useFileUpload;
