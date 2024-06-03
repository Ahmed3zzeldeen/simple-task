import React from 'react'
import TodoListNav from '@/components/TodoListNav'

export default function layout({ children }: Readonly<{ children: React.ReactNode }>) {
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
