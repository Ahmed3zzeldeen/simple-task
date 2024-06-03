"use client";
import { deleteTodo, updateTodo } from '@/firebase/apis/todos';
import clsx from 'clsx';
import React, { useState } from 'react'

export default function TodoItem({
  id = '1',
  title = 'Task 1',
  description = 'Description of Task 1 Lorem ipsum dolor, sit amet consectetur adipisicing elit. A, nisi. Iure fuga expedita inventore maxime rerum consequuntur libero, suscipit non deserunt. Blanditiis, error! At aliquid, reprehenderit consequuntur dolor eveniet consectetur?',
  dueDate = '2024-05-31',
  completed = false,
  userId = '123',
  checkedDate = null
}: DTodo) {
  const [isCompleted, setIsCompleted] = useState<boolean>(completed);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [taskTitle, setTaskTitle] = useState<string>(title);
  const [taskDescription, setTaskDescription] = useState<string>(description);
  const [taskDueDate, setTaskDueDate] = useState<string>(dueDate);
  const [taskCheckedDate, setTaskCheckedDate] = useState<string | null>(checkedDate);

  const handleComplete = async () => {
    const TODAY = new Date().toISOString().split('T')[0];
    setIsCompleted(!isCompleted);
    if (!isCompleted) {
      setTaskCheckedDate(TODAY);
    }
    const updatedTask: DTodo = {
      id,
      title: taskTitle,
      description: taskDescription,
      dueDate: taskDueDate,
      completed: !isCompleted,
      checkedDate: isCompleted ? null : TODAY,
      userId
    }
    try {
      const Todo = await updateTodo(userId, id, updatedTask);
    } catch (error) {
      console.error('Error updating task:', error);
    }
  }

  const handleDelete = async () => {
    try {
      const Todo = await deleteTodo(userId, id);
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  }

  const handleEdit = () => {
    console.log('Edit task');
    setIsEditing(true);
  }

  const handleSave = async () => {
    setIsEditing(false);
    const updatedTask: DTodo = {
      id,
      title: taskTitle,
      description: taskDescription,
      dueDate: taskDueDate,
      completed: isCompleted,
      checkedDate: taskCheckedDate,
      userId
    }
    try {
      const Todo = await updateTodo(userId, id, updatedTask);
    } catch (error) {
      console.error('Error updating task:', error);
    }
  }



  return (
    <div className='flex items-center justify-start md:justify-between flex-wrap gap-2 p-2 rounded-md bg-zinc-700'>
      <div className='w-10/12 flex flex-col'>
        {/* Task title */}
        <div className='flex gap-2 items-center'>
          <input className='checked:bg-green-700' type='checkbox' checked={isCompleted} onChange={handleComplete} />
          {
            isEditing ? (
              <input
                type='text'
                value={taskTitle}
                onChange={(e) => setTaskTitle(e.target.value)}
                required
                className='
                text-lg font-bold text-gray-300
                bg-transparent p-2 rounded-md w-full
                border-b-2 border-gray-500
                m-2
                '
              />
            ) :
              <>
                <h3 className={clsx('text-lg font-bold text-gray-300', { 'line-through': isCompleted })} >
                  {taskTitle}
                </h3>
                {isCompleted && taskCheckedDate && <span className='text-sm text-gray-400'> ✅ at {taskCheckedDate}</span>}
            </>
          }
        </div>
        <div className='ml-6'>
          {/* Description with details tag */}
          {
            isEditing ? (
              <textarea
                value={taskDescription}
                onChange={(e) => setTaskDescription(e.target.value)}
                className='
                text-sm text-gray-400 bg-transparent p-2 rounded-md w-full h-24 resize-none
                
                border-2 border-gray-500
                '
              />
            ) : (
              <details className='text-sm text-gray-400'>
                <summary className={clsx('font-bold', { 'text-gray-400': isCompleted, 'text-white': !isCompleted })}>Description</summary>
                {
                  isCompleted ? (
                    <p className='text-sm line-through'>{taskDescription}</p>
                  ) : (
                    <p className='text-sm '>{taskDescription}</p>
                  )
                }
              </details>
            )
          }
          {/* Due date */}
          <div className='flex gap-2 items-center'>
            <span className={clsx('font-bold', { 'text-gray-400': isCompleted, 'text-white': !isCompleted })}>Due Date:</span>
            {
              isEditing ? (
                <input
                  type='date'
                  value={taskDueDate}
                  required
                  onChange={(e) => {
                    setTaskDueDate(e.target.value)
                  }}
                  className='text-sm text-gray-400 bg-transparent p-2 rounded-md w-1/2border-2 border-gray-500'
                />
              ) : (
                <p className='text-sm text-gray-400'>{taskDueDate}  </p>
              )
            }
          </div>
        </div>
      </div>
      {/* action buttons */}
      <div className='flex flex-row md:flex-col gap-2'>
        {isEditing ? (
          <>
            <button className='bg-red-700 text-white p-2 rounded-md' onClick={handleDelete}>Delete</button>
            <button className='bg-green-700 text-white p-2 rounded-md' onClick={handleSave}>Save</button>
          </>
        ) : (
          <button className='bg-purple-700 text-white p-2 rounded-md' onClick={handleEdit}>Edit</button>
        )}
      </div>
    </div>
  )
}
