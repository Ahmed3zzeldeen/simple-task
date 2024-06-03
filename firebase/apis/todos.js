import { db } from "../Config";
import {
  collection,
  getDocs,
  query,
  onSnapshot,
  where,
  doc,
  getDoc,
  addDoc,
  updateDoc,
  deleteDoc,
  orderBy,
} from "firebase/firestore";
import { TODOS_FILTERS } from "@/constants/TODOS_FILTERS";


async function getTodos(userId) {
  const todosCollectionRef = collection(db, "users", userId, "todos");
  const Todos = await getDocs(todosCollectionRef);
  return Todos.docs.map((todo) => ({ ...todo.data(), id: todo.id }));
}

function getTodosStream(userId, callback , filter = TODOS_FILTERS.ALL) {
  const todosCollectionRef = collection(db, `users/${userId}/todos`);
  let q;
  // Filter todos based on the filter value passed
  if(filter === TODOS_FILTERS.ALL) {
    q = query(todosCollectionRef , orderBy("dueDate", "asc"))
  } else if(filter === TODOS_FILTERS.COMPLETED) {
    q = query(todosCollectionRef, where("completed", "==", true) , orderBy("dueDate", "asc"));
  } else if(filter === TODOS_FILTERS.TODAY) {
    const today = new Date().toISOString().split('T')[0];
    q = query(todosCollectionRef, where("dueDate", "==", today) , orderBy("dueDate", "asc"));
  } else if(filter === TODOS_FILTERS.WEEK) {
    const today = new Date().toISOString().split('T')[0];
    const SEVEN_DAYS = 7 * 24 * 60 * 60 * 1000;
    const nextWeek = new Date(new Date().getTime() + SEVEN_DAYS).toISOString().split('T')[0];
    q = query(todosCollectionRef, where("dueDate", ">=", today), where("dueDate", "<", nextWeek) , orderBy("dueDate", "asc"));
  }

  const unsubscribe = onSnapshot(q, (querySnapshot) => {
    const todos = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    callback(todos);
  });

  return unsubscribe;
}

async function findTodoById(userId, todoId) {
  const todoDocRef = doc(db, `users/${userId}/todos/${todoId}`);
  const todoDocSnapshot = await getDoc(todoDocRef);
  if (todoDocSnapshot.exists()) {
    return { ...todoDocSnapshot.data(), id: todoDocSnapshot.id };
  } else {
    return null;
  }
}

async function createTodo(userId, todoData) {
  const todosCollectionRef = collection(db, `users/${userId}/todos`);
  todoData.createdAt = new Date().toISOString().split('T')[0];
  const todoDocRef = await addDoc(todosCollectionRef, todoData);
  const todoUpdated = await updateTodo(userId, todoDocRef.id, {
    ...todoData,
    id: todoDocRef.id,
  });
  return todoUpdated;
}


async function updateTodo(userId ,todoId, todoData) {
  const todo = await findTodoById(userId,todoId);
  if (!todo) {
    throw new Error("Todo not found");
  }
  const todoDocRef = doc(db, `users/${userId}/todos`, todoId);
  const todoAfterUpdate = await updateDoc(todoDocRef, {...todoData});
  return todoAfterUpdate;
}


async function deleteTodo(userId, todoId) {
  const todoDocRef = doc(db, `users/${userId}/todos`, todoId);
  let todo = await getDoc(todoDocRef);
  if (!todo) {
    return; // if todo is not exist will ignore this deletion
  }
  const res = await deleteDoc(todoDocRef);
  return res;
}

export { 
  getTodos,
  getTodosStream,
  findTodoById,
  createTodo,
  updateTodo,
  deleteTodo,
};
