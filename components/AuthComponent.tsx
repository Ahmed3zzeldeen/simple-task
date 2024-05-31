"use client";

import useAuth from '@/hooks/useAuth';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React from 'react'

export default function AuthComponent() {
  const { user, isLoggedIn , logout } = useAuth();
  const router = useRouter();

  return (
    <div>
      {user ?
        (
          <div className='flex items-center justify-center w-full gap-5'>
            <div className='flex items-center gap-5'>
            <Image src={user?.avatar} alt="avatar" className='w-10 h-10 rounded-full' width={100} height={100} />
              <h2>{user?.name}</h2>
            </div>
            {/* get started btn */}
            <button className='bg-red-500  text-white  rounded-md  mt-2  px-2  py-1  hover:bg-red-600  transition  duration-200  ease-in-out' onClick={logout}>Logout</button>
          </div>
        ) : (
          <div className='flex justify-between gap-5 mt-5'>
            <Link href="/auth/login" className='bg-blue-500  text-white  rounded-md  mt-2  px-2  py-1  hover:bg-blue-600  transition  duration-200  ease-in-out'>Login</Link>
            <Link href="/auth/signup" className='bg-blue-500  text-white  rounded-md  mt-2  px-2  py-1  hover:bg-blue-600  transition  duration-200  ease-in-out'>Signup</Link>
          </div>
        )}
    </div>
  )
}
