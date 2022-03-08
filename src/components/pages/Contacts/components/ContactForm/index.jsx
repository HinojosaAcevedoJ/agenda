/* eslint-disable react/jsx-props-no-spreading */

import { useForm } from 'react-hook-form'
import { useEffect } from 'react'
import { yupResolver } from '@hookform/resolvers/yup'
import { isEmpty } from 'ramda'
import { useNavigate } from 'react-router-dom'
import validationSchema from './validationSchema'
import HookInput from '../../../../common/HookInput'
import Button from '../../../../common/Button'
import { useContacts } from '../../context/ContactContext'
import { useAuth } from '../../../../context/AuthContext'

function ContactForm() {
  const {
    handleCreateContact,
    updatingContact,
    isUpdating,
    handleUpdateContact,
    handleCancelUpdate
  } = useContacts()

  const { isAuth } = useAuth()

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm({
    defaultValues: {
      firstName: 'Pepito'
    },
    resolver: yupResolver(validationSchema)
  })

  const navigate = useNavigate()

  useEffect(() => {
    reset(updatingContact)
  }, [updatingContact, reset])

  useEffect(() => {
    if (!isAuth) {
      navigate('/login')
    }
  }, [isAuth, navigate])

  return (
    <div className="p-4 h-screen shadow rounded m-6 bg-blue-900">
      <h1 className="text-2xl font-bold mb-2">{isUpdating ? 'Actualizando' : 'Crear'} Contacto</h1>
      <form className="space-y-4" onSubmit={handleSubmit(isUpdating ? handleUpdateContact : handleCreateContact)}>
        <HookInput
          name="firstName"
          label="Nombre"
          placeholder="Nombre"
          register={register}
          errorMessage={errors.firstName?.message}
        />
        <HookInput
          name="lastName"
          label="Apellido"
          placeholder="Apellido"
          register={register}
          errorMessage={errors.lastName?.message}
        />
        <HookInput
          name="age"
          label="Edad"
          placeholder="Edad"
          register={register}
          errorMessage={errors.age?.message}
        />
        <HookInput
          name="phone"
          label="Phone"
          placeholder="Phone"
          register={register}
          errorMessage={errors.phone?.message}
        />
        <HookInput
          name="email"
          label="Email"
          placeholder="Email"
          type="email"
          register={register}
          errorMessage={errors.email?.message}
        />
        <HookInput
          name="image"
          label="Avatar"
          placeholder="Url de avatar"
          register={register}
          errorMessage={errors.image?.message}
        />
        <Button block className="mr-2" type="submit" disabled={!isEmpty(errors)}>Submit</Button>
        <Button block className="mr-2" type="button" onClick={handleCancelUpdate}>Cancel</Button>
      </form>
    </div>
  )
}

export default ContactForm
