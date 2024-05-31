'use client';
import useAuth from '@/hooks/useAuth';
import Link from 'next/link';
import React from 'react'
import AuthComponent from './AuthComponent';

export default function Header() {
  const { user, isLoggedIn, logout } = useAuth();
  return (
    <header className='
    w-full
    flex
    items-center
    justify-between
    bg-gray-800
    text-white
    px-5
    py-3
    fixed
    '>
      <Link href='/' className='text-2xl font-bold'>
        Simple Task App
      </Link>
      <AuthComponent />
    </header>
  )
}
