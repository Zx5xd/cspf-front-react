// src/components/NaverLoginButton.tsx
import React from 'react';
import {migHost} from "../../util/apiInof.ts";

const NaverLoginButton: React.FC = () => {

    const host = migHost()
        // import.meta.env.VITE_LOCAL_HOST;

    const NAVER_CLIENT_ID = import.meta.env.VITE_NAVER_CLIENT_ID;
    const REDIRECT_URI = host+'auth/naver/callback'; // Vite dev server의 URL
    const STATE_STRING = import.meta.env.VITE_STATE_STRING; // CSRF 공격 방지를 위한 상태 값

    console.log('NAVER_CLIENT_ID:', NAVER_CLIENT_ID);
    console.log('STATE_STRING', STATE_STRING);


    const naverLoginUrl = `https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=${NAVER_CLIENT_ID}&redirect_uri=${encodeURIComponent(REDIRECT_URI)}&state=${STATE_STRING}`;

    return (
        <a href={naverLoginUrl} style={{ textDecoration: 'none' }}>
    <button
        style={{
        backgroundColor: '#03C75A',
            color: 'white',
            padding: '10px 20px',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
            fontSize: '16px',
    }}
>
    네이버 로그인
    </button>
     </a>
);
};

export default NaverLoginButton;
