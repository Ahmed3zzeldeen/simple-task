'use client';
import ROUTES from '@/constants/routes';
import { resetPasswordApi } from '@/firebase/apis/auth';
import { set } from 'firebase/database';
import React, { FormEvent, useState } from 'react'


interface errorType {
  message: string
}

function ResetPasswordForm() {

  const [email, setEmail] = useState<string>('')
  const [error, setError] = useState<errorType>({ message: '' })
  const [success, setSuccess] = useState<boolean>(false)

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    // check if email and password are empty
    setError({ message: '' });
    setSuccess(false);
    if (!email) {
      setError({ message: 'Email is required' });
      return;
    }
    // check if email is valid
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    if (!emailRegex.test(email)) {
      setError({ message: 'Email is not valid' });
      return;
    }

    try {
      // @ts-ignore
      await resetPasswordApi(email);
      setSuccess(true);

    } catch (error) {
      // @ts-ignore
      setError(error)
    }
  }

  return (
    <form className="
      flex
      flex-col
      justify-between
      p-14
      border
      border-gray-200
      rounded-lg
      shadow-md
    ">
      <h2
        className="text-3xl font-bold my-4"
      >
        Reset Password
      </h2>
      <p
        className="text-gray-500 my-4"
      >
        You are forget your password, <br /> 
        don&apos;t worry we will help you to reset it. <br />
      </p>
      <p className="text-yellow-400">Note: Make sure you have access to your email</p>
      <input
        name="email"
        type="email"
        placeholder="Email"
        className="
          border
          border-gray-200
          text-gray-500
          rounded-lg
          p-2
          w-80
          my-4
        "
        value={email}
        onChange={(e) => {
          setEmail(e.target.value);
          setError({ message: '' });
        }
        }
      />
      {error && <p className="text-red-500 mb-5">{error.message}</p>}
      {success && <p className="text-green-500 mb-5">Password reset link sent to your email</p>}
      <a
        href={ROUTES.AUTH.LOG_IN}
        className="text-blue-500 my-2"
      >
        I remember my password? Login
      </a>
      <a
        href={ROUTES.AUTH.SING_UP}
        className="text-blue-500"
      >
        I don not have an account? Register
      </a>
      <button
        type="submit"
        className="
          bg-blue-500
          text-white
          rounded-lg
          p-2
          w-80
          my-4
        "
        onClick={handleSubmit}
      >
        Reset Password
      </button>
    </form>
  )
}

export default ResetPasswordForm