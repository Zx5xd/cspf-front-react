import React from 'react';
import { useNavigate } from 'react-router-dom';

const EmailBut: React.FC = () => {
    const navigate = useNavigate();

    const emailVerifyRedirect = () => {
      // '/target-path' 경로로 리다이렉트합니다.
      navigate('/email');
    };

    const voiceChatRedirect = () => {
        // '/target-path' 경로로 리다이렉트합니다.
        navigate('/voiceChat');
      };

      const searchNewsRedirect = () => {
        // '/target-path' 경로로 리다이렉트합니다.
        navigate('/searchNews?query=동물보호');
      };

      const caseLawsRedirect = () => {
        // '/target-path' 경로로 리다이렉트합니다.
        navigate('/caseLaw?query=동물보호');
      };

      const aniInfoRedirect = () => {
        // '/target-path' 경로로 리다이렉트합니다.
        navigate('/aniInfo');
      };

    const imageToTextRedirect = () => {
        // '/target-path' 경로로 리다이렉트합니다.
        navigate('/itt');
    };

    const HomeRedirect = () => {
        // '/target-path' 경로로 리다이렉트합니다.
        navigate('/pass');
    };
  
    return (
        <div>
            <h1>Button</h1>
            <button onClick={emailVerifyRedirect}>emailVerify</button>
            <button onClick={voiceChatRedirect}>voiceChat</button>
            <button onClick={searchNewsRedirect}>searchNews</button>
            <button onClick={caseLawsRedirect}>caseLaws</button>
            <button onClick={aniInfoRedirect}>aniInfo</button>
            <button onClick={imageToTextRedirect}>ImageToText</button>
            <button onClick={HomeRedirect}>SSO Login</button>
        </div>
    );
};

export default EmailBut;
