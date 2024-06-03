'use client';

import AddNewTaskForm from '@/components/AddNewTaskForm';
import TodoItem from '@/components/TodoItem';
import UseAuth from '@/hooks/UseAuth';
import { getTodosStream } from '@/firebase/apis/todos';
import { useEffect, useState } from 'react';

export default function Page() {
  const [tasks, setTasks] = useState<DTodo[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = UseAuth();

  useEffect(() => {
    setLoading(true);
    if (!user) {
      setTasks([]);
    } else if (user && user.id) {
      const unsubscribe = getTodosStream(user.id, (todos: DTodo[]) => {
        setTasks(todos);
        setLoading(false);
      });
      return () => {
        unsubscribe();
      }
    } else {
      setTasks([]);
      setLoading(false);
    }
  }, [user?.id , user]);

  return (
    <div className='flex flex-col gap-4'>
      <AddNewTaskForm />
      <div className='flex flex-col gap-4'>
        <h2 className='text-2xl font-bold text-purple-700'>All Tasks:</h2>
        {loading ? (
          <p className='text-gray-400'>Loading...</p>
        ) : (
          tasks.length === 0 ? (
            <p className='text-gray-400'>
              You have not created any tasks yet 🥺
            </p>
          ) : (
            tasks.map((task: DTodo) => (
              <TodoItem
                key={task.id}
                userId={task.userId}
                id={task.id}
                title={task.title}
                description={task.description}
                dueDate={task.dueDate}
                completed={task.completed}
                checkedDate={task.checkedDate}
              />
            ))
          )
        )}
      </div>
    </div>
  )
}
