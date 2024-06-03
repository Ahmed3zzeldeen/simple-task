'use client';

import React, { useLayoutEffect } from 'react'
import TodoListNav from '@/components/TodoListNav'
import { useRouter } from 'next/navigation';
import ROUTES from '@/constants/routes';
import LoadingComponent from '@/components/LoadingComponent';
import { auth } from '@/firebase/Config';

export default function Layout({ children }: Readonly<{ children: React.ReactNode }>) {
  const [loading, setLoading] = React.useState(true);
  const router = useRouter();
  
  useLayoutEffect(() => {
    auth.onAuthStateChanged(async (userData) => {
      setLoading(true);
      if (userData) {
        setLoading(false);
      }else {
        router.push(ROUTES.AUTH.LOG_IN);
        setLoading(false);
      }
    });
  }, [router]);

  if (loading) {
    return <LoadingComponent />;
  }

  return (
    <div className='container flex justify-between items-start gap-6 flex-wrap md:flex-nowrap'>
      <div className='flex flex-col gap-10 w-full lg:w-1/5 md:w-5/5 max-h-96 bg-zinc-800 rounded-md p-4'>
        <h2 className='text-md font-bold text-purple-700'>Filters</h2>
        <TodoListNav />
      </div>
      <div
        className='flex flex-col gap-4 w-full bg-zinc-800 rounded-md p-4'
        style={{
          minHeight: '50vh',
        }}
      >
        {children}
      </div>

    </div>
  )
}
