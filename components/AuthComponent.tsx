"use client";

import React from 'react'
import useAuth from '@/hooks/useAuth';
import Image from 'next/image';
import Link from 'next/link';
import ROUTES from '@/constants/routes';

export default function AuthComponent() {
  const { user, logout , isLoading } = useAuth();

  // Render the skeleton while we wait for the user to load
  if (isLoading) {
    return (
      <div className='flex items-center gap-5'>
        <div className='w-10 h-10 bg-gray-300 rounded-full'></div>
        <div className='w-20 h-5 bg-gray-300 rounded-md'></div>
      </div>
    )
  }

  return (
    <div>
      {user ?
        (
          <div className='flex items-center justify-center w-full gap-5'>
            <div className='flex items-center gap-5'>
              <Image src={user?.avatar} alt="avatar" className='w-10 h-10 rounded-full' width={100} height={100} />
              <h2>{user?.name}</h2>
            </div>
            <button className='bg-red-500  text-white  rounded-md  mt-2  px-2  py-1  hover:bg-red-600  transition  duration-200  ease-in-out' onClick={logout}>Logout</button>
          </div>
        ) : (
          <div className='flex justify-between items-center gap-5'>
            <Link href={ROUTES.AUTH.LOG_IN} className='bg-blue-500  text-white  rounded-md  mt-2  px-2  py-1  hover:bg-blue-600  transition  duration-200  ease-in-out'>Login</Link>
            <Link href={ROUTES.AUTH.SING_UP} className='bg-blue-500  text-white  rounded-md  mt-2  px-2  py-1  hover:bg-blue-600  transition  duration-200  ease-in-out'>Signup</Link>
          </div>
        )}
    </div>
  )
}
