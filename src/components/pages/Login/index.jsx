import { isEmpty } from 'ramda'
import { Link, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { useEffect } from 'react'
import { yupResolver } from '@hookform/resolvers/yup'
import HookInput from '../../common/HookInput'
import Button from '../../common/Button'
import validationSchema from './validationSchema'
import { useAuth } from '../../context/AuthContext'

export default function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(validationSchema)
  })

  const { login, isAuth } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    if (isAuth) {
      navigate('/')
    }
  }, [isAuth, navigate])

  return (
    <div className="min-h-screen min-w-screen bg-gray-900 flex items-center justify-center">
      <div className="p-4 shadow rounded m-6 bg-gray-800">
        <h1 className="text-2xl font-bold mb-2 text-gray-50">Login</h1>
        <form className="space-y-4" onSubmit={handleSubmit(login)}>
          <HookInput
            name="email"
            label="Email"
            placeholder="Email"
            register={register}
            errorMessage={errors.email?.message}
          />
          <HookInput
            name="password"
            label="Password"
            placeholder="Contraseña"
            type="password"
            register={register}
            errorMessage={errors.password?.message}
          />
          <Button block className="mr-2" type="submit" disabled={!isEmpty(errors)}>Login</Button>
          <Link to="/signup" className="font-bold text-gray-50">No tienes cuenta? Haz click aquí para registrarte</Link>
        </form>
      </div>
    </div>
  )
}
