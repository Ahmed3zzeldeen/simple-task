"use client";

import React from 'react'
import { FaCalendarWeek, FaClipboardCheck } from 'react-icons/fa'
import { IoToday } from 'react-icons/io5'
import { MdInbox } from 'react-icons/md'
import { usePathname, useRouter } from 'next/navigation';
import ROUTES from '@/constants/routes';
import clsx from 'clsx';

export default function TodoListNav() {
  const router = useRouter();
  const pathname = usePathname();

  const navItems = [
    {
      icon: <MdInbox />,
      text: 'All',
      href: ROUTES.TASKS.HOME,
    },
    {
      icon: <IoToday />,
      text: 'Today',
      href: ROUTES.TASKS.TODAY,
    },
    {
      icon: <FaCalendarWeek />,
      text: 'Week',
      href: ROUTES.TASKS.WEEK,
    },
    {
      icon: <FaClipboardCheck />,
      text: 'Completed',
      href: ROUTES.TASKS.COMPLETED,
    }
  ];

  return (
    <nav>
      <ul className='flex flex-col gap-1'>
        {navItems.map((item, index) => (
          <li key={index} className='w-full' >
            <button className={clsx('w-full flex items-center gap-2 text-sm p-2 rounded-md text-gray-300 hover:bg-zinc-700' , {"bg-zinc-700": pathname === item.href })} onClick={() => router.replace(item.href)}>{item.icon} {item.text}</button>
          </li>
        ))}
      </ul>
    </nav>
  )
}
