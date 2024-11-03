import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchUrl } from '../../util/fetchData.ts';
import { UserLoginForm } from '../../components/user/UserLoginForm.tsx';
import {migHost} from "../../util/apiInof.ts";
import {axiosPost} from "../../util/axiosData.ts";
// import {getCookie, removeCookie, setCookie} from '../../util/cookie.ts';
// import {useCookies} from "react-cookie";



export const AdminLogin: React.FC = () => {
  // const [getCookie, setCookie, removeCookie] = useCookies(['authorization','refreshToken']);
  const [formData, setFormData] = useState({
    username:'',
    password:'',
  })

  const navigate = useNavigate();

  const handleSubmit = async () => {


   // const cspfHost = import.meta.env.VITE_CSPF_HOST;
      const cspfHost = migHost()
          // import.meta.env.VITE_DEV_CSPF_HOST;
      console.log(cspfHost);

    // await fetchUrl(cspfHost+'auth/login/admin',
    //               JSON.stringify(formData)).
    // then(data => {
    //    console.log(data);
    //   // console.log(getCookie('authorization'));
    //   navigate('/admin');
    // });

    axiosPost(`${cspfHost}auth/login/admin`,formData).then(data => {
      console.log(data);
      navigate('/admin')
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

   <UserLoginForm userRole="관리자"
                  roleId="AdminId"
                  handleChange={handleChange}
                  handleSubmit={handleSubmit}
                  handleHide={false}
                  errorMessage={''}
   />

  );
}