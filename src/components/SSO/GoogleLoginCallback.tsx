// src/pages/NaverLoginCallback.tsx
import base64 from 'base-64';
import utf8 from 'utf8';
import React, {useEffect, useState} from 'react';
import { useSearchParams } from 'react-router-dom';

const GoogleLoginCallback: React.FC = () => {
    const [searchParams] = useSearchParams();
    const [user, setUser] = useState({ familyName: '', givenName: '',
      email: '',
      provider: '',
      providerId: '', });

    useEffect(() => {

        const token = searchParams.get('token');

        // @ts-ignore
        const payload = token.substring(token.indexOf('.')+1,token.lastIndexOf('.'));
        const decodedPayload = base64.decode(payload);
        const jsonPayload = JSON.parse(utf8.decode(decodedPayload));
        console.log(JSON.stringify(jsonPayload));

        setUser(jsonPayload);



    }, [searchParams]);

    return (
      <div style={{ textAlign: 'center', marginTop: '100px' }}>
        <h1>Login Callback</h1>
        <p>id : {user.providerId}</p>
        <p>Name : {user.familyName + user.givenName}</p>
        <p>Email : {user.email}</p>
        <p>provider : {user.provider}</p>
      </div>
    );
};

export default GoogleLoginCallback;
