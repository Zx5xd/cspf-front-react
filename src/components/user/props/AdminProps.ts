import React from 'react';
import {ExpertEntity, ExpertPublicEntity} from "./ExpertProps.ts";


export interface ContentProps {
  title: string;
  content: string;
}

export interface AnnounceManageProps {
  id: number;
  admin: string;
  content: string;
  createdAt: string;
  title: string;
}

export interface QuestionsManageProps {
  id: number;
  authorCode: string;
  title: string;
  content: string;
  createdAt: string;
}

export interface AnnAndQuesWriteModalProps {
  show: boolean;
  handleClose: () => void;
  handleSave: () => void;
  formData?: Partial<AnnounceManageProps | QuestionsManageProps>;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export interface CheckCerttableProps{
  expert: ExpertEntity | undefined;
  CheckButton: (expert: ExpertEntity) => void;
}

export interface ChckCertModalProps {
  formData: ExpertEntity | undefined;
  handleClose: () => void;
  denyCert: (expert: ExpertEntity | undefined) => void;
  handleSave: (expert: ExpertEntity | undefined) => void;
  visionStart: () => void;
  visionText: string | undefined;
  image?: string;
  show: boolean;
  hidden: boolean;
}

// Expert
export interface AdminExpertEditModalProps {
  show: boolean;
  handleClose: () => void;
  handleSave: () => void;
  formData: Partial<ExpertEntity> | null;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleProfileInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  editingUser: ExpertEntity | null;
  publicProfile: ExpertPublicEntity | null;
  editingProfile:Partial<ExpertPublicEntity> | null;
}