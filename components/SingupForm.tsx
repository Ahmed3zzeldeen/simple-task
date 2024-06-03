'use client';
import ROUTES from '@/constants/routes';
import useAuth from '@/hooks/useAuth';
import React, { FormEvent, useState } from 'react'


interface errorType {
  message: string
}

function SingupForm() {
  const {signup } = useAuth();
  const [fullname, setFullname] = useState<string>('')
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [error, setError] = useState<errorType>({ message: '' })
  
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    // check if fullname ,email and password are empty
    if (!email || !password || !fullname) {
      if (fullname === '') {
        setError({ message: 'Fullname is required' });
      }
      if (email === '') {
        setError({ message: 'Email is required' });
      }
      if (password === '') {
        setError({ message: 'Password is required' });
      }
      if (fullname === '' && email === '') {
        setError({ message: 'Fullname and Email are required' });
      }
      if (fullname === '' && password === '') {
        setError({ message: 'Fullname and Password are required' });
      }
      if (email === '' && password === '') {
        setError({ message: 'Email and Password are required' });
      }
      if (fullname === '' && email === '' && password === '') {
        setError({ message: 'Fullname, Email and Password are required' });
      }
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
      await signup(fullname, email, password);
      console.log('User registered successfully');
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
      p-4
      md:p-14
      border
      border-gray-200
      rounded-lg
      shadow-md
    ">
      <h2
        className="text-3xl font-bold my-4"
      >
        Register
      </h2>
      <input
        name="fullname"
        type="text"
        placeholder="Fullname"
        className="
          border
          border-gray-200
          text-gray-500
          rounded-lg
          p-2
          w-full
          my-4
        "
        value={fullname}
        onChange={(e) => {
          setFullname(e.target.value);
          setError({ message: '' });
          }
        }
      />
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
          w-full
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
          w-full
          my-4
        "
        value={password}
        onChange={(e) => 
          {
            setPassword(e.target.value);
            setError({ message: '' });
            }
        }
      />
      {error && <p className="text-red-500">{error.message}</p>}
      <a
        href={ROUTES.AUTH.LOG_IN}
        className="text-blue-500 my-4"
      >
        I have an account? Login
      </a>
      <button
        type="submit"
        className="
          bg-blue-500
          text-white
          rounded-lg
          p-2
          w-full
        "
        onClick={handleSubmit}
      >
        signup
      </button>
    </form>
  )
}

export default SingupForm