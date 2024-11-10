import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserLoginForm } from '@/components/user/UserLoginForm.tsx';
import { axiosLoagin, axiosLogin, axiosPost } from '@/util/axiosData.ts';
import {migHost} from "@/util/apiInof.ts";

export const ExpertLogin: React.FC = () => {
  const [formData, setFormData] = useState({
    username:'',
    password:'',
  })
  const [errorMessage, setErrorMessage] = useState('');


  const navigate = useNavigate();
  const handleSubmit = async () => {
    // const cspfHost = import.meta.env.VITE_DEV_CSPF_HOST;
    //     const cspfHost = import.meta.env.VITE_LOCAL_HOST;
      const cspfHost = migHost();
      // console.log(cspfHost);
    // await fetchUrl(cspfHost+'auth/login/expert',
    //   JSON.stringify(formData)).
    // then(data => {
    //   const pars = JSON.parse(data);
    //   pars.success? navigate('/expert') : setErrorMessage(pars.message)
    //
    // });
    axiosLogin(`${cspfHost}auth/login/expert`, formData).then(data => {
      console.log(data);
      data.status === 201? navigate('/expert') : setErrorMessage(data.data.message)
      });
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  return (
    <UserLoginForm userRole="전문가"
                   roleId="ExpertId"
                   handleChange={handleChange}
                   handleSubmit={handleSubmit}
                   handleHide={true}
                   errorMessage={errorMessage}
    />
  );
}