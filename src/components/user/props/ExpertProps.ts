import React from "react";

export interface ExpertEntity {
    expertCode?: string;
    username: string;
    password: string;
    name: string;
    company: string;
    email: string;
    phone: string;
    credentialStatus: number;
    // refreshToken: string;
    expertType?: React.SetStateAction<string>;
    profile: string;
    image: string;
    certImage: string;
}

export interface ExpertPublicEntity {
    id: string;
    expertCode?: ExpertEntity;
    workexperience: string;
    companyaddr: string;
    product: string;
    image?: string;
}

export interface PrivateProfileProps {
    handleEdit: () => void;
    handleSetPassword: () => void;
    expertData: Partial<ExpertEntity>;
}


export interface ExpertPublicFormProp{
    expertData: ExpertEntity | undefined;
    expertPublicData : Partial<ExpertPublicEntity>;
    handleSetDetailProfile: () => void;
}

export interface ExpertChatManage {
    ChckToRequestChat: () => void;
}


// Modal
export interface ExpertEditModalProps {
    show: boolean;
    handleClose: () => void;
    handleSave: () => void;
    formData: Partial<ExpertEntity> | null;
    handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    handleCheck?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    editingUser: ExpertEntity | undefined;
}

export interface ExpertInfoProps {
    expert: ExpertEntity,
    name: string,
    email: string,
    handleEdit: (user: ExpertEntity) => void,
    handleDelete: (userCode: string) => void,
    user: ExpertEntity,
}