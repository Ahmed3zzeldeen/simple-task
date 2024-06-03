import { db } from "../Config";
import {
  collection,
  getDocs,
  query,
  onSnapshot,
  where,
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
    q = query(todosCollectionRef);
  } else if(filter === TODOS_FILTERS.COMPLETED) {
    q = query(todosCollectionRef, where("completed", "==", true));
  } else if(filter === TODOS_FILTERS.TODAY) {
    const today = new Date().toISOString().split('T')[0];;
    q = query(todosCollectionRef, where("dueDate", "==", today));
  } else if(filter === TODOS_FILTERS.WEEK) {
    const today = new Date().toISOString().split('T')[0];;
    const SEVEN_DAYS = 7 * 24 * 60 * 60 * 1000;
    const nextWeek = new Date(new Date().getTime() + SEVEN_DAYS).toISOString().split('T')[0];
    q = query(todosCollectionRef, where("dueDate", ">=", today), where("dueDate", "<", nextWeek));
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

export { getTodos, getTodosStream };
