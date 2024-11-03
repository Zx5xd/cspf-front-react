// src/pages/SSOHome.tsx
import React from 'react';
import NaverLoginButton from '../components/SSO/NaverLoginButton.tsx';
import GoogleLoginButton from "../components/SSO/GoogleLoginButton.tsx";

const SSOHome: React.FC = () => {
    return (
        <div style={{ textAlign: 'center', marginTop: '100px' }}>
            <h1>Welcome to My App</h1>
            <NaverLoginButton />
            <GoogleLoginButton/>
        </div>
    );
};

export default SSOHome;
