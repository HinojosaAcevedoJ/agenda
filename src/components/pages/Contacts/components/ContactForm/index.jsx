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
    resolver: yupResolver(validationSchema)
  })

  const navigate = useNavigate()

  useEffect(() => {
    reset(updatingContact)
  }, [updatingContact, reset])

  useEffect(() => {
    reset(handleUpdateContact)
  }, [handleUpdateContact, reset])

  useEffect(() => {
    if (!isAuth) {
      navigate('/login')
    }
  }, [isAuth, navigate])

  return (
    <div className="w-64">
      <div className="fixed w-64 p-4 shadow rounded m-6 bg-gray-800">
        <h1 className="text-2xl font-bold mb-2 text-gray-50">{isUpdating ? 'Actualizar' : 'Crear'} Contacto</h1>
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
          {isUpdating && <Button block className="mr-2 bg-red-500" type="button" onClick={handleCancelUpdate}>Cancel</Button> }
        </form>
      </div>
    </div>
  )
}

export default ContactForm
