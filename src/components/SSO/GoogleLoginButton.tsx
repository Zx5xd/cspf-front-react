// import { GoogleLogin } from "@react-oauth/google";
// import { GoogleOAuthProvider } from "@react-oauth/google";
import styled from 'styled-components';
import {migHost} from "../../util/apiInof.ts";

const GoogleLoginButton = () => {
  const host = migHost()
      // import.meta.env.VITE_LOCAL_HOST;

// 스타일드 컴포넌트를 사용하여 버튼 디자인
    const GoogleButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #4285F4;
  color: #fff;
  border: none;
  border-radius: 5px;
  padding: 10px 20px;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.3s ease;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);

  &:hover {
    background-color: #357ae8;
  }

  &:focus {
    outline: none;
  }
`;

// 구글 로고 아이콘 스타일
    const GoogleIcon = styled.img`
  width: 20px;
  height: 20px;
  margin-right: 10px;
`;

        const handleLogin = () => {
            // 백엔드의 구글 로그인 엔드포인트로 이동
            window.location.href = host+"auth/google";
        };

        return (
          <GoogleButton onClick={handleLogin}>
              <GoogleIcon src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg" alt="Google icon" />
              Sign in with Google
          </GoogleButton>
        );

};

export default GoogleLoginButton;
