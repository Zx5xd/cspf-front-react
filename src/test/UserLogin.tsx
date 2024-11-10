import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchUrl } from '../util/fetchData.ts';
import { UserLoginForm } from '../components/user/UserLoginForm.tsx';
import {migHost} from "../util/apiInof.ts";
import { axiosLogin } from '@/util/axiosData.ts';
// import {getCookie, removeCookie, setCookie} from '../../util/cookie.ts';
// import {useCookies} from "react-cookie";



export const UserLogin: React.FC = () => {
  // const [getCookie, setCookie, removeCookie] = useCookies(['authorization','refreshToken']);
  const [formData, setFormData] = useState({
    username:'',
    password:'',
  })

  const navigate = useNavigate();

  const handleSubmit = async () => {


   // const cspfHost = import.meta.env.VITE_CSPF_HOST;
   //    const cspfHost = import.meta.env.VITE_DEV_CSPF_HOST;
    const cspfHost = migHost();
    console.log(cspfHost);

    axiosLogin(`${cspfHost}auth/login`,formData).then(data => {
      console.log(data);
    })
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };




  return (

   <UserLoginForm userRole="User"
                  roleId="UserId"
                  handleChange={handleChange}
                  handleSubmit={handleSubmit}
                  handleHide={false}
                  errorMessage={''}
   />

  );
}