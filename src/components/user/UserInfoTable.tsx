import React from 'react';
import { UserInfoProps } from './props/UserProps.ts';
import { Button, Table } from 'react-bootstrap';
import { CheckCerttableProps } from './props/AdminProps.ts';
import {ExpertInfoProps} from "./props/ExpertProps.ts";

export const UsertableItem:React.FC<UserInfoProps> = ({
  userCode, name, email, handleEdit, handleDelete, user
}) => {

    return(  <Table striped bordered hover className="mt-3">
      <thead>
      <tr>
        <th>userCode</th>
        <th>이름</th>
        <th>이메일</th>
        <th>Actions</th>
      </tr>
      </thead>
      <tbody>

        <tr key={userCode}>
          <td>{userCode}</td>
          <td>{name}</td>
          <td>{email}</td>
          <td>
            <Button variant="info" onClick={() => handleEdit(user)} className="me-2">Edit</Button>
            <Button variant="danger" onClick={() => handleDelete(userCode)}>Delete</Button>
          </td>
        </tr>

      </tbody>
    </Table>);
}

export const ExperttableItem:React.FC<ExpertInfoProps> = ({
                                                         name, email, handleEdit, handleDelete, user, expert
                                                      }) => {

    return(
        <Table striped bordered hover className="mt-3">
        <thead>
        <tr>
            <th>userCode</th>
            <th>이름</th>
            <th>이메일</th>
            <th>Actions</th>
        </tr>
        </thead>
        <tbody>

        <tr key={expert.expertCode}>
            <td>{expert.expertCode}</td>
            <td>{name}</td>
            <td>{email}</td>
            <td>
                <Button variant="info" onClick={() => handleEdit(user)} className="me-2">Edit</Button>
                <Button variant="danger" onClick={() => handleDelete(expert.expertCode || '')}>Delete</Button>
            </td>
        </tr>

        </tbody>
    </Table>);
}

export const CerttableItem:React.FC<CheckCerttableProps> = ({
                                           expert, CheckButton
                                                      }) => {

  return(
    <Table striped bordered hover className="mt-3">
      <thead>
      <tr>
        <th>이름</th>
        <th>회사명</th>
        <th>전화번호</th>
        <th>Actions</th>
      </tr>
      </thead>
      <tbody>

      <tr key={expert?.expertCode}>
        <td>{expert?.name}</td>
        <td>{expert?.company}</td>
        <td>{expert?.phone}</td>
        <td>
          <Button variant="info" onClick={() => CheckButton(expert)} className="me-2">자격 확인</Button>
        </td>
      </tr>

      </tbody>
    </Table>
  );
}