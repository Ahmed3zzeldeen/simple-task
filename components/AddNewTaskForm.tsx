"use client";

import { createTodo } from '@/firebase/apis/todos';
import UseAuth from '@/hooks/UseAuth';
import React, { useState } from 'react'

export default function AddNewTaskForm({ inToday, inWeek }: { inToday?: boolean, inWeek?: boolean }) {
  const { user } = UseAuth();
  const [taskTitle, setTaskTitle] = useState<string>('');
  const [taskDescription, setTaskDescription] = useState<string>('');
  const TODAY = new Date().toISOString().split('T')[0];
  const [taskDueDate, setTaskDueDate] = useState<string>(TODAY);
  const THE_END_OF_WEEK = new Date(new Date().getTime() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];

  const handleAddTask = async () => {
    if (!taskTitle || !taskDueDate) {
      alert('Please fill in the task title and due date');
      return;
    }
    if(user === null){
      alert('Please login to add a task');
      return;
    }

    const newTask:DTodo = {
      id: '',
      title: taskTitle,
      description: taskDescription,
      completed: false,
      checkedDate: null,
      dueDate: taskDueDate,
      userId: user.id,
    }
    const Todo = await createTodo(user.id , newTask);
    setTaskTitle('');
    setTaskDescription('');
    setTaskDueDate(TODAY);
  }


  return (
    <details open>
      <summary className='text-md font-bold text-purple-700 mb-4'>
        {inToday ? 'Add New Task for Today' : inWeek ? 'Add New Task for Next 7 Days' : 'Add New Task'}
      </summary>
      <div className='flex items-center flex-wrap md:justify-between md:flex-nowrap gap-2 md:gap-5  p-2 rounded-md bg-zinc-700'>
        <div className='flex flex-col w-full'>
          <div >
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
        <div className='
        w-full 
        md:max-w-max
        flex flex-col gap-2'>
          <button className="
          w-full
          bg-purple-500 
          hover:text-purple-500 
          text-white 
          hover:bg-purple-100 
          rounded-lg 
          p-2 
          flex" 
          onClick={handleAddTask}>
            <svg className="h-6 w-6 mr-2" width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round" >  <path stroke="none" d="M0 0h24v24H0z" />  <circle cx="12" cy="12" r="9" />  <line x1="9" y1="12" x2="15" y2="12" />  <line x1="12" y1="9" x2="12" y2="15" /></svg>
            <span>Add Task</span>
          </button>
        </div>
      </div>
    </details>
  )
}
