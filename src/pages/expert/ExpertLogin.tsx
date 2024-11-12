import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { UserLoginForm } from '@/components/user/UserLoginForm.tsx'
import { axiosLoagin, axiosLogin, axiosPost } from '@/util/axiosData.ts'
import { migHost } from '@/util/apiInof.ts'
import { useAuthStore, useLoginAction } from '@/store/useAuthStore.ts'
import { getCookie } from '@/util/cookie.ts'
import { useExpertStore } from '@/store/useExpertStore.ts'

export const ExpertLogin: React.FC = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  })
  const [errorMessage, setErrorMessage] = useState('')
  const { isAuthenticated, login } = useAuthStore()
  const { expert } = useExpertStore()

  useEffect(() => {
    if (isAuthenticated) {
      console.log(expert)
      formData.username = expert.username
      formData.password = expert.password

      handleSubmit()
    }
    if (!isAuthenticated) return
  }, [])

  const navigate = useNavigate()
  const handleSubmit = async () => {
    axiosLogin(`${migHost()}auth/login/expert`, formData).then((data) => {
      data.status === 201
        ? (login('expert'), navigate('/expert'))
        : setErrorMessage(data.data.message)
    })
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value,
    })
  }

  return (
    <UserLoginForm
      userRole='전문가'
      roleId='ExpertId'
      handleChange={handleChange}
      handleSubmit={handleSubmit}
      handleHide={true}
      errorMessage={errorMessage}
    />
  )
}
