// src/authContext.jsx
import React, { createContext, useContext, useEffect, useRef, useState } from "react";
import { auth } from "./firebase/firebaseConfig";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { toast } from "react-toastify";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);

  const prevUserRef = useRef(null);
  const skipLoginToast = useRef(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      const previousUser = prevUserRef.current;

      if (user) {
        // 👑 CHECK ADMIN CLAIM
        const token = await user.getIdTokenResult(true);
        setIsAdmin(token.claims.admin === true);
      } else {
        setIsAdmin(false);
      }

      // 🔔 LOGIN TOAST
      if (!previousUser && user && user.emailVerified) {
        toast.success("Logged in successfully!");
      }

      // 🔔 LOGOUT TOAST
      if (previousUser && !user) {
        toast.info("Logged out!");
      }

      prevUserRef.current = user;
      setCurrentUser(user);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  // 🔐 LOGOUT FUNCTION
  const logout = async () => {
    try {
      await signOut(auth);
    } catch {
      toast.error("Logout failed!");
    }
  };

  return (
    <AuthContext.Provider value={{ currentUser, isAdmin, logout }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
