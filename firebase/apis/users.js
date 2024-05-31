import { db } from "../Config";
import {
  collection,
  getDocs,
  setDoc,
  deleteDoc,
  doc,
  query,
  where,
  getDoc,
  updateDoc,
} from "firebase/firestore";


async function getUsers() {
  const usersCollectionRef = collection(db, "users");
  const Users = await getDocs(usersCollectionRef);
  return Users.docs.map((user) => ({ ...user.data(), id: user.id }));
}

async function createUser(
  uid,
  name,
  email,
) {
  const userDocRef = doc(db, "users", uid);
  let res = await setDoc(
    userDocRef,
    {
      id: uid,
      name,
      email,
      avatar: `https://api.multiavatar.com/${uid}.png`,
    },
  );
  return res;
}


async function deleteUser(uid) {
  const userDocRef = doc(db, "users", uid);
  let user = (await getDoc(userDocRef)) ;
  const res = await deleteDoc(userDocRef);
  return res;
}

async function updateUser(uid, userData) {
  const user = await findUserById(uid);
  if (!user) {
    throw new Error("User not found");
  }
  const userDocRef = doc(db, "users", uid);
  await updateDoc(userDocRef, userData);
}

async function findUserById(uid) {
  const userDocRef = doc(db, "users", uid);
  const userDocSnapshot = await getDoc(userDocRef);
  if (userDocSnapshot.exists()) {
    return { ...userDocSnapshot.data(), id: userDocSnapshot.id };
  }
}

async function findUserByField(field, value) {
  const usersCollectionRef = collection(db, "users");
  const q = query(usersCollectionRef, where(field, "==", value));
  const querySnapshot = await getDocs(q);
  if (querySnapshot.empty) {
    return null;
  }
  return querySnapshot.docs[0].data();
}

export {
  getUsers,
  createUser,
  updateUser,
  deleteUser,
  findUserById,
  findUserByField
};
