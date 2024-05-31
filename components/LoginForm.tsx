'use client';
import useAuth from '@/hooks/useAuth';
import { useRouter } from 'next/navigation';
import React, { FormEvent, useState } from 'react'


interface errorType {
  message: string
}

function LoginForm() {
  const { login } = useAuth();
  const router = useRouter();
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [error, setError] = useState<errorType>({ message: '' })

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    // check if email and password are empty
    if (!email || !password) {
      setError({ message: 'Email and Password are required' });
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
      await login(email, password);
      router.push('/');
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
        Login
      </h2>
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
      <input
        name="password"
        type="password"
        placeholder="Password"
        className="
          border
          border-gray-200
          text-gray-500
          rounded-lg
          p-2
          w-80
          my-4
        "
        value={password}
        onChange={(e) => {
          setPassword(e.target.value);
          setError({ message: '' });
        }
        }
      />
      {error && <p className="text-red-500 mb-5">{error.message}</p>}
      <div className="flex justify-between w-80">
        <label>
          <input
            type="checkbox"
            className="mr-2"
          />
          Remember me
        </label>
        <a
          href="/auth/forgot-password"
          className="text-blue-500"
        >
          Forgot Password?
        </a>
      </div>
      <a
        href="/auth/signup"
        className="text-blue-500 my-4"
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
        Login
      </button>
    </form>
  )
}

export default LoginForm