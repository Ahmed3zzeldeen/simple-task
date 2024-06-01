import AddNewTaskForm from '@/components/AddNewTaskForm';
import TodoItem from '@/components/TodoItem';

export default function page() {
  const tasks: DTodo | [] = [];

  const fetchTasks = async () => {
    // TODO: Fetch today tasks from the firebase
  
  }

  fetchTasks();

  return (
    <div className='flex flex-col gap-4'>
      <AddNewTaskForm inToday={true}  />
      <div className='flex flex-col gap-4'>
        <h2 className='text-2xl font-bold text-purple-700'>Today tasks: </h2>
        {
          tasks.length === 0 ? (
            <p className='text-gray-400'>No tasks for today</p>
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
