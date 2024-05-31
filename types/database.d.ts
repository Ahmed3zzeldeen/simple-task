interface DUser {
  id: number;
  name: string;
  email: string;
  avatar: string;
}

interface DTodo {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  dueDate: string;
  userId: string;
}