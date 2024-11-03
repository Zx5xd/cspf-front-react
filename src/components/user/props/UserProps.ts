import React from 'react';
import {ExpertPublicEntity} from "./ExpertProps.ts";
import {AnnounceManageProps, QuestionsManageProps} from "./AdminProps.ts";

export interface UserProps {
  userCode: string,
  username: string,
  password: string,
  name: string,
  nickname: string,
  email: string,
  address: string,
  phone: string,
  refreshToken: string,
  gender: string,
  petOwnership: string,
}

export interface UserInfoProps {
  userCode: string,
  name: string,
  email: string,
  handleEdit: (user: UserProps) => void,
  handleDelete: (userCode: string) => void,
  user: UserProps,
}

export interface UserEditModalProps {
  show: boolean;
  handleClose: () => void;
  handleSave: () => void;
  formData: Partial<UserProps> | null;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleCheck: (e: React.ChangeEvent<HTMLInputElement>) => void;
  editingUser: UserProps | null;
}

export interface UserLoginFormProps{
  userRole: string;
  roleId: string;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: () => void;
  handleHide: boolean;
  errorMessage: string | null;
}

export interface EditPassModalProps {
  userCode: string;
  pwd1?: string;
  pwd2?: string;
}

export interface EditPassFormProps{
  show: boolean;
  handleClose: () => void;
  handleSave: () => void;
  formData: Partial<EditPassModalProps>;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export interface DetailProfileProps{
  userCode: string;
  workexperience?: string;
  product?: string;
}

export interface ExpertDetailProfileModalProps{
  show: boolean;
  handleClose: () => void;
  handleSave: () => void;
  formData: Partial<ExpertPublicEntity>;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

