import { auth } from "../Config.js";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  sendPasswordResetEmail,
} from "firebase/auth";
import { createUser, findUserByField } from "./users.js";

// Register a new user.
async function registerApi(name, email, password) {
  try {
    let emailLower;
    // Check if the email is already in use.
    if (email) {
      emailLower = email.toLowerCase();
      const foundUserByEmail = await findUserByField("email", emailLower);
      if (foundUserByEmail) {
        throw new Error("Email already exists enter another one");
      }
    }
    const credentials = await createUserWithEmailAndPassword(
      auth,
      emailLower,
      password
    );

    await createUser(credentials.user.uid, name, email);

    return credentials;
  } catch (error) {
    throw error;
  }
}

async function loginApi(email, password) {
  try {
    if (!email || !password) {
      throw new Error("Email and password are required");
    }
    const user = await findUserByField("email", email);
    if (!user) {
      throw new Error("User not found");
    }
    const credentials = await signInWithEmailAndPassword(auth, email, password);
    return credentials;
  } catch (error) {
    throw error;
  }
}

async function logoutApi() {
  try {
    const user = auth.currentUser;
    if (user) {
      await signOut(auth);
      console.log("User logged out successfully.");
    } else {
      console.log("No user is logged in.");
    }
  } catch (error) {
    throw error;
  }
}

async function resetPasswordApi(email) {
  try {
    if (!email) {
      throw new Error("Email is required");
    }
    await sendPasswordResetEmail(auth, email);
  } catch (error) {
    throw error;
  }
}

export { registerApi, loginApi, logoutApi, resetPasswordApi };
