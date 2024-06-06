'use client';
import React from 'react'
import AuthComponent from './AuthComponent';
import { useRouter } from 'next/navigation';
import ROUTES from '@/constants/routes';

export default function Header() {
  const router = useRouter();

  return (
    <header className='w-full flex items-center justify-between bg-zinc-900 shadow-md px-5 py-3 fixed' style={{ height: '10vh', zIndex: 1000 }}>
      <h1 className='text-lg sm:text-xl md:text-2xl lg:text-2xl xl:text-3xl font-bold text-cyan-200 cursor-pointer hover:text-cyan-100 transition-all duration-300 ease-in-out'
        style={{
          textShadow: `0px 0px 10px rgb(34, 211, 238),0px 0px 15px rgb(34, 211, 238)`
        }}
        onClick={() => router.push(ROUTES.LANDING)}>
        Simple Task
      </h1>
      <AuthComponent />
    </header>
  )
}
