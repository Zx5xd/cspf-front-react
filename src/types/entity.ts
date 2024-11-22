import React from "react";

export interface UserEntity {
    userCode: string;
    username: string;
    password: string;
    name: string;
    nickname: string;
    email: string;
    addr: string;
    phone: string;
    refreshToken?: string | null;
    gender?: string | null;
    petOwnership?: string | null;
    imageUrl?: string | null;
    createdTime: Date;
    profileImg?: string | null;
}

export interface ExpertEntity {
    expertCode?: string,
    username: string,
    password: string,
    name: string,
    company: string,
    email: string,
    phone: string,
    credentialStatus: number,
    expertType?: React.SetStateAction<string>,
    profile?: ExpertPublicEntity,
    image: string,
    certImage: string,
    exeprt?: any
}

export interface ExpertPublicEntity {
    id: string
    workexperience: string
    companyaddr: string
    product: string
    image?: string
}

export interface QuestionsEntity {
    id: number;
    authorCode: string;
    title: string;
    content: string;
    createdAt: string;
}

export interface AnnounceEntity {
    id: number;
    admin: string;
    content: string;
    createdAt: string;
    title: string;
}

export interface BlackListEntity {
    id?: number
    declarer: string
    perpetrator: string
    chatRoomId: string
    chatMessage: string
    description?: string
    createdAt?: string
}
