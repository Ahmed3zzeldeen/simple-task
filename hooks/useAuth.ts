"use client";

import { useEffect, useState } from "react";
import { auth } from "@/firebase/Config";
import { loginApi, logoutApi, registerApi} from "@/firebase/apis/auth";
import { findUserById } from "@/firebase/apis/users";
import { register } from "module";

const useAuth = () => {
  const [user, setUser] = useState<DUser | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  useEffect(() => {
    auth.onAuthStateChanged(async (userData) => {
      setIsLoggedIn(userData && userData.uid ? true : false);
      if (userData) {
        const userFound = await findUserById(userData.uid);
        // @ts-ignore
        setUser(userFound);
        console.log("User is logged in");
        console.log("UserFound: ", userFound);
        
      }else {
        console.log("User is logged out");
      }
    });
  }, [isLoggedIn]);

  const logout = async () => {
    try {
      await logoutApi();
      setUser(null);
      setIsLoggedIn(false);
    } catch (error) {
      throw error;
    }
  }

  const login = async (email: string, password: string) => {
    try {
      await loginApi(email, password);
    } catch (error) {
      throw error;
    }
  }

  const signup = async (name:string, email: string, password: string) => {
    try {
      const credentials = await registerApi(name, email, password);
      const user = await findUserById(credentials.user.uid);
      if(user) {
        // @ts-ignore
        setUser(user);
      } else {
        throw new Error("User not found");
      }
    } catch (error) {
      throw error;
    }
  }


  return { user, isLoggedIn , signup , login , logout};
};


export default useAuth;
