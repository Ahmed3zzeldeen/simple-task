"use client";

import React, { useState } from 'react'

export default function AddNewTaskForm({ inToday, inWeek }: { inToday?: boolean, inWeek?: boolean }) {
  const [taskTitle, setTaskTitle] = useState<string>('');
  const [taskDescription, setTaskDescription] = useState<string>('');
  const [taskDueDate, setTaskDueDate] = useState<string>("2024-05-31");

  const TODAY = new Date().toISOString().split('T')[0];
  const THE_END_OF_WEEK = new Date(new Date().getTime() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];

  const handleAddTask = () => {
    // TODO: Add task to the database
    console.log('Add task');
  }


  return (
    <details open>
      <summary className='text-md font-bold text-purple-700 mb-4'>
        {inToday ? 'Add New Task for Today' : inWeek ? 'Add New Task for Next 7 Days' : 'Add New Task'}
      </summary>
      <div className='flex items-center justify-between gap-2 p-2 rounded-md bg-zinc-700'>
        <div className='w-10/12 flex flex-col'>
          <div className='flex gap-2 items-center ml-6'>
          </div>
          <div className='ml-6'>
            {/* Task title */}
            <input
              type='text'
              placeholder='Enter task title here...'
              value={taskTitle}
              onChange={(e) => setTaskTitle(e.target.value)}
              required
              className='text-lg font-bold text-gray-300 bg-transparent p-2 rounded-md w-full border-b-2 border-gray-500 mb-2'
            />
            {/* Description with details tag */}
            <textarea
              value={taskDescription}
              onChange={(e) => setTaskDescription(e.target.value)}
              placeholder='Enter task description here...'
              className='
                text-sm text-gray-400 bg-transparent p-2 rounded-md w-full h-24 resize-none
                
                border-2 border-gray-500
                '
            />
            {/* Due date */}
            <div className='flex gap-2 items-center'>
              <span className='font-bold'>Due Date:</span>
              <input
                type='date'
                placeholder='yyyy-mm-dd'
                value={taskDueDate}
                required
                {
                ...(inToday && { min: TODAY, max: TODAY })
                }
                {
                ...(inWeek && { min: TODAY, max: THE_END_OF_WEEK })
                }
                onChange={(e) => {
                  setTaskDueDate(e.target.value)
                }}
                className='text-sm text-gray-400 bg-transparent p-2 rounded-md w-1/2border-2 border-gray-500'
              />

            </div>
          </div>
        </div>
        {/* action buttons */}
        <div className='flex flex-col gap-2'>
          <button className="border-2 border-purple-500 p-2 text-purple-500 hover:text-white hover:bg-purple-500 rounded-lg flex" onClick={handleAddTask}>
            <svg className="h-6 w-6 mr-2" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">  <path stroke="none" d="M0 0h24v24H0z" />  <circle cx="12" cy="12" r="9" />  <line x1="9" y1="12" x2="15" y2="12" />  <line x1="12" y1="9" x2="12" y2="15" /></svg>
            <span>Add Task</span>
          </button>
        </div>
      </div>
    </details>
  )
}
