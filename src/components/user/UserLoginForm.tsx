import { UserLoginFormProps } from './props/UserProps.ts';
import { Button, Container } from 'react-bootstrap';
import '../../style/wrapper.css';
import useEnterKey from "@/hooks/useEnterKey.ts";


export const UserLoginForm: React.FC<UserLoginFormProps> = ({
  userRole, roleId, handleChange, handleSubmit, handleHide, errorMessage
                                        }) => {

  const {handleKeyDown} = useEnterKey(handleSubmit)

  return (
    <div className={'wrapper'}>
      <div className={'wrapper-content'}>
        <Container className="p-3 bg-body border">
          <h3 className="mb-4">{userRole}</h3>

          <div className="form-floating mb-3">
            <input type="text" placeholder={roleId} name="username" id="username" onChange={handleChange} onKeyDown={handleKeyDown} />
          </div>
          <div className="form-floating mb-3">
            <input type="password" placeholder="Password" name="password" id="password" onChange={handleChange} onKeyDown={handleKeyDown} />
          </div>
          <Button className="btn-primary mb-2 text-center" type="submit" onClick={handleSubmit}>로그인</Button>
          {errorMessage && <p>{errorMessage}</p>}
          {/* handleHide가 true일 때 회원가입 링크 표시 */}
          {handleHide && (
            <div className="mt-3">
              <a href="/expert/signup">회원가입</a>
            </div>
          )}
        </Container>
      </div>
    </div>

  )
}