interface DUser {
  id: string;
  name: string;
  email: string;
  avatar: string;
}

interface DTodo {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  checkedDate: string | null;
  dueDate: string;
  userId: string;
}