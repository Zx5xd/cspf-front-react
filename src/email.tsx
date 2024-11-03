import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Form } from 'react-bootstrap';
import { useCookies } from 'react-cookie';

const Email:React.FC = () => {
  const host = import.meta.env.VITE_LOCAL_HOST;
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [hide, setHide] = useState(false);
  const [num, setNum] = useState('');
  const [cookies, setCookies, removeCookie] = useCookies(['emailToken']);

  useEffect(() => {
    if(cookies.emailToken !== undefined)
      console.log(cookies);
  }, [cookies]);
  
  const handleGetCode = async () => {
    setError('');
    setMessage('');

    try {
      // GET 요청을 보냅니다.
      await axios.get(host + 'mailauth/registerAuth', {
        withCredentials: true
      }).then(() => {
        setMessage('이메일 난수코드 전송 성공!');
        setHide(true);
      }).catch(() => {
        setError('요청이 실패했습니다. 다시 시도해주세요.');
      });

    } catch (err) {
      console.error('Error during GET request:', err);
      setError('요청 중 오류가 발생했습니다. 다시 시도해주세요.');
    }
  };

  const handleSetCode = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNum(e.target.value);
  };

  const sendAuthCode = async () => {

    if (num.length === 6) {
      try {
        // GET 요청을 보냅니다.
        await axios.post(host + 'mailauth/mailVerify', {
          code: num,
        }, {withCredentials: true}).then(data => {
          console.log(data);
          // eslint-disable-next-line @typescript-eslint/no-unused-expressions
          data.data.isValid === true ? setMessage('이메일 인증 성공!') : setError('인증 실패.');
        })
      } catch (err) {
        console.error('Error during GET request:', err);
        setError('요청 중 오류가 발생했습니다. 다시 시도해주세요.');
      }
    } else {
      setMessage('인증코드를 다시 입력해주세요.');
    }};

    return (
      <div>
        <h1>Email Registration</h1>
        <button onClick={handleGetCode}>Send Request</button>
        {message && <p style={{ color: 'green' }}>{message}</p>}
        {error && <p style={{ color: 'red' }}>{error}</p>}
        {hide &&
          <>
            <Form.Label htmlFor="emailValidator">이메일 코드</Form.Label>
            <Form.Control
              type="text"
              maxLength={6}
              id="emailValidator"
              aria-describedby="emailValidateCodeBlock"
              onChange={handleSetCode}
            />
            <Form.Text id="emailValidateCodeBlock" muted>
              숫자 6자리를 입력해주세요.
            </Form.Text>
            <button onClick={sendAuthCode}>Send authcode</button>
          </>
        }
      </div>
    );

};

export default Email;