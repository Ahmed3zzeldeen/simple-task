import AddNewTaskForm from '@/components/AddNewTaskForm';
import TodoItem from '@/components/TodoItem';

export default function page() {
  const tasks: DTodo | [] = [];

  const fetchTasks = async () => {
    // TODO: Fetch Next 7 Days Tasks from the firebase
    
  }

  fetchTasks();

  return (
    <div className='flex flex-col gap-4'>
      <AddNewTaskForm inWeek={true}  />
      <div className='flex flex-col gap-4'>
        <h2 className='text-2xl font-bold text-purple-700'>Next 7 Days Tasks: </h2>
        {
          tasks.length === 0 ? (
            <p className='text-gray-400'>No tasks for next 7 days</p>
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
        }
      </div>
    </div>
  )
}
