'use client'

import { login, registerUser } from '@/actions'
import clsx from 'clsx'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'

interface IFormInputs {
  name: string
  email: string
  password: string
}

export const RegisterForm = () => {
  const router = useRouter()
  const [errorMessage, setErrorMessage] = useState('')
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInputs>()
  const onSubmit: SubmitHandler<IFormInputs> = async data => {
    const { email, name, password } = data

    // Server action
    const resp = await registerUser(name, email, password)
    if (!resp.ok) {
      setErrorMessage(resp.message)
      return
    }

    // Server action Login
    await login(email.toLowerCase(), password)
    window.location.replace('/')
  }
  return (
    <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col'>
      <label htmlFor='text'>Nombre Completo</label>
      <input
        className={clsx('px-5 py-2 border bg-gray-200 rounded mb-5', {
          'border-red-500': errors.name,
        })}
        type='text'
        autoFocus
        {...register('name', { required: true })}
      />
      {errors.name?.type === 'required' && (
        <span className='text-red-500'>*El nombre es obligatorio</span>
      )}
      <label htmlFor='email'>*Correo electrónico</label>
      <input
        className={clsx('px-5 py-2 border bg-gray-200 rounded mb-5', {
          'border-red-500': errors.email,
        })}
        type='email'
        {...register('email', { required: true, pattern: /\S+@\S+\.\S+/ })}
      />

      {errors.email?.type === 'required' && (
        <span className='text-red-500'>*El correo es obligatorio</span>
      )}
      {errors.email?.type === 'pattern' && (
        <span className='text-red-500'>*El correo no es válido</span>
      )}

      <label htmlFor='email'>*Contraseña</label>
      <input
        className={clsx('px-5 py-2 border bg-gray-200 rounded mb-5', {
          'border-red-500': errors.password,
        })}
        type='password'
        {...register('password', { required: true })}
      />
      {errors.password?.type === 'required' && (
        <span className='text-red-500'>La contraseña es obligatoria</span>
      )}

      {errorMessage && <span className='text-red-500'>{errorMessage}</span>}

      <button className='btn-primary'>Crear cuenta</button>

      {/* divisor line */}
      <div className='flex items-center my-5'>
        <div className='flex-1 border-t border-gray-500'></div>
        <div className='px-2 text-gray-800'>O</div>
        <div className='flex-1 border-t border-gray-500'></div>
      </div>
      <Link href='/auth/login' className='btn-secondary text-center'>
        Ingresar
      </Link>
    </form>
  )
}
