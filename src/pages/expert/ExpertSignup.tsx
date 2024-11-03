import React, {ChangeEvent, useEffect, useState} from 'react';
import {Form, Button, Container, ToggleButtonGroup, ToggleButton} from 'react-bootstrap';
import '../../style/wrapper.css'
import axios from "axios";
import {ExpertEntity} from "../../components/user/props/ExpertProps.ts";
import {fetchData, fetchUrl} from "../../util/fetchData.ts";
import {removeCookie} from "../../util/cookie.ts";
import {axiosImagePost} from "../../util/axiosData.ts";
import {useNavigate} from "react-router-dom";
import {migHost} from "@/util/apiInof.ts";

export const ExpertSignup: React.FC = () => {
  // const migHost() = import.meta.env.VITE_LOCAL_HOST;
  const navigate = useNavigate();

  const [hide, setHide] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [usernameMessage, setUsernameMessage] = useState('');
  const [usernameError, setUsernameError] = useState('');
  const [passMessage, setPassMessage] = useState('');
  const [passError, setPassError] = useState('');
  const [password2, setPassword2] = useState('');
  const [authNumber,setAuthNumber] = useState('');
  const [subCredentials, setSubCredentials] = useState(0);
  const [formData, setFormData] = useState<Partial<ExpertEntity>>();
  const [file, setFile] = useState<File | null>(null); // 선택된 파일 상태

  const [radioValue, setRadioValue] = useState('');
  const [ChckInsur, setChckInsur] = useState(false);

  const handleToggleChange = (val: React.SetStateAction<string>) => {
    setSubCredentials(0);
    console.log(subCredentials)
    val === 'Insurance' ? setChckInsur(true) : setChckInsur(false);
    setRadioValue(val);
    setFormData({
      ...formData,
      expertType: val,
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {

    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });

    if(name === 'password2') setPassword2(e.target.value);
    if(name === 'authNumber') setAuthNumber(e.target.value);

    formData && (formData.password === password2) ?
        (setPassMessage('동일한 비밀번호입니다.'), setPassError('')) : (setPassMessage(''), setPassError('비밀번호가 다릅니다. 다시 작성해주세요.'))

    if((formData && (formData.password === '')) || password2 === '') {setMessage(''); setPassError('');}

  };


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    console.log(subCredentials);

    console.log('Form Data Submitted: ', formData);

    fetchUrl(migHost() + 'expert', JSON.stringify(formData)).then((response) => {
      console.log(response);
    }).catch((error) => {
      console.log(error)
    });

    navigate('/login/expert');
    // 여기에 formData를 서버로 보내는 로직을 추가할 수 있습니다.
  };

  const checkEmail = (e: React.FormEvent) => {
    e.preventDefault()
    const domainPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    {   formData?.email !== undefined ? (domainPattern.test(formData?.email) ? EmailSubmit():setError('잘못된 이메일 형식입니다.')): (setError('에러가 발생했습니다. 잠시 후에 다시 시도 해주세요.'))}
  };

  const EmailSubmit = async () => {
    setError('');
    // console.log('Email Submitted: ', formData?.email);


    {
      formData?.email !== undefined  ? (
    await axios.post(migHost() + 'mailauth/registerAuth', {
      email: formData?.email,
    },{
      withCredentials: true
    }).then(() => {
      setMessage('이메일 난수코드 전송 성공!');
      setHide(true);
    }).catch(() => {
      setError('요청이 실패했습니다. 다시 시도해주세요.');
    }),

    setHide(true)
      ): (setError('에러가 발생했습니다. 잠시 후에 다시 시도 해주세요.'))}
    // 여기에 formData를 서버로 보내는 로직을 추가할 수 있습니다.
  };

  const chkIdSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('chkId Submitted: ', formData?.username);

    formData && fetchData(migHost() + 'expert/' + formData.username).then( r =>
        r.success? (setUsernameMessage(r.message), setUsernameError('')) : (setUsernameError(r.message), setUsernameMessage(''))
    );
  }

  const CertSubmit = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
    }

  }

  useEffect(() => {
    if (file) {
      imageUpload();
    }
  }, [file]);

  const imageUpload = () => {
    console.log(`imageUpload`, file)
    if (!file) {
      console.log('no File');
      return;
    }

    const imageFormData = new FormData();
    imageFormData.append('file',file);

      axiosImagePost(`${migHost()}images/cert`,imageFormData).then(data => {
        if(data && data.status === 201){
          console.log(data.data);
          setSubCredentials(subCredentials+1)
          setFormData({
            ...formData,
            certImage: data.data.toString()
          })
        }
      })
  }


  const EmailAuthSubmit = async (e: React.FormEvent) => {
    console.log('EmailAuth Submitted: ', formData?.email);
    e.preventDefault();

    if (authNumber.length === 6) {
      try {
        // GET 요청을 보냅니다.
        await axios.post(migHost() + 'mailauth/mailVerify', {
          code: authNumber,
        }, {withCredentials: true}).then(data => {
          console.log(data);
          // eslint-disable-next-line @typescript-eslint/no-unused-expressions
          data.data.isValid === true ? (
            setMessage('이메일 인증 성공!'),
          setError(''), setHide(false), removeCookie('emailToken')
        ) : setError('인증 실패.');
        })
      } catch (err) {
        console.error('Error during GET request:', err);
        setError('요청 중 오류가 발생했습니다. 다시 시도해주세요.');
      }
    } else {
      setMessage('인증코드를 다시 입력해주세요.');
    }
  }


  return (
      <><ToggleButtonGroup className={'pb-3'} type="radio" name="expertType" value={radioValue} onChange={handleToggleChange}>
        <ToggleButton className={'me-3 btn'} id="attorney" value="Lawyer">
          변호사
        </ToggleButton>
        <ToggleButton className={'me-3 btn'} id="veterinarian" value="Veterinarian">
          수의사
        </ToggleButton>
        <ToggleButton className={'btn'} id="Insurance" value="Insurance">
          보험사
        </ToggleButton>
      </ToggleButtonGroup>

         <div className="wrapper">
          <div className="wrapper-content">
            { radioValue.length > 0 ? (
                <Container className="p-4 bg-light border">
              <h2 className="mb-4 text-center">회원가입</h2>
              <Form onSubmit={handleSubmit}>
                {/* ID 입력 */}
                <Form.Group controlId="formId" className="mb-3">
                  <Form.Label>아이디</Form.Label>
                  <Form.Control
                      type="text"
                      placeholder="Enter ID"
                      name="username"
                      value={formData?.username}
                      onChange={handleChange}
                      required/>
                  <Form.Control
                      type="button"
                      name={"chkIdButton"}
                      value={"중복확인"}
                      onClick={chkIdSubmit}/>
                  {usernameMessage && <p style={{color: 'green'}}>{usernameMessage}</p>}
                  {usernameError && <p style={{color: 'red'}}>{usernameError}</p>}
                </Form.Group>

                {/* Password 입력 */}
                <Form.Group controlId="formPassword" className="mb-3">

                  <Form.Label>비밀번호</Form.Label>
                  <Form.Control
                      type="password"
                      placeholder="비밀번호"
                      name="password"
                      value={formData?.password}
                      onChange={handleChange}
                      required/>
                  <Form.Control
                      type="password"
                      placeholder="비밀번호 확인"
                      name="password2"
                      value={password2}
                      onChange={handleChange}
                      required/>
                  {passMessage && <p style={{color: 'green'}}>{passMessage}</p>}
                  {passError && <p style={{color: 'red'}}>{passError}</p>}
                </Form.Group>

                {/* Name 입력 */}
                <Form.Group controlId="formName" className="mb-3">
                  <Form.Label>이름</Form.Label>
                  <Form.Control
                      type="text"
                      placeholder="Enter Name"
                      name="name"
                      value={formData?.name}
                      onChange={handleChange}
                      required/>
                </Form.Group>

                {/* Company 입력 */}
                <Form.Group controlId="formCompany" className="mb-3">
                  <Form.Label>회사</Form.Label>
                  <Form.Control
                      type="text"
                      placeholder="Enter Company"
                      name="company"
                      value={formData?.company}
                      onChange={handleChange}
                      required/>
                </Form.Group>

                {/* Certificate of Employment 체크박스 */}
                { !ChckInsur && <Form.Group controlId="formCertSubmit" className="mb-3">
                  <Form.Label>자격증서 제출</Form.Label>
                  <Form.Control
                      type="file"
                      name={"CertSubmitButton"}
                      onChange={CertSubmit}/>
                  <Form.Check
                      type="checkbox"
                      name="certificateOfEmployment"
                      label={"제출 완료시 체크표시가 바뀝니다."}
                      checked={subCredentials > 0}
                      disabled={true}/>
                </Form.Group>}

                {/* Email 입력 */}
                <Form.Group controlId="formEmail" className="mb-3">
                  <Form.Label>이메일</Form.Label>
                  <Form.Control
                      type="email"
                      placeholder="Enter Email"
                      name="email"
                      value={formData?.email}
                      onChange={handleChange}
                      required/>
                  <Form.Control
                      type="button"
                      name={"emailButton"}
                      value={"제출"}
                      onClick={checkEmail}/>
                  {ChckInsur && <p><small> 회사 이메일로 작성해주세요.</small></p>}
                  {message && <p style={{color: 'green'}}>{message}</p>}
                  {error && <p style={{color: 'red'}}>{error}</p>}
                  {hide && (
                      <Form.Control
                          type="text"
                          placeholder="인증번호"
                          name="authNumber"
                          value={authNumber}
                          onChange={handleChange}
                          required/>
                  )}{hide && (
                    <Form.Control
                        type="button"
                        name={"emailAuthButton"}
                        value={"확인"}
                        onClick={EmailAuthSubmit}/>)}
                </Form.Group>

                {/* Phone 입력 */}
                <Form.Group controlId="formPhone" className="mb-3">
                  <Form.Label>전화번호</Form.Label>
                  <Form.Control
                      type="tel"
                      placeholder="Enter Phone"
                      name="phone"
                      value={formData?.phone}
                      onChange={handleChange}
                      required/>
                </Form.Group>

                {/* 제출 버튼 */}
                <Button variant="primary" type="submit" className="w-100">
                  회원가입
                </Button>
              </Form>

            </Container> ) : (<p>직종 타입에 따라 버튼을 클릭해주세요.</p>)
            }
          </div>
        </div>

      </>
  );
};
