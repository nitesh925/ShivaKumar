// src/authContext.jsx
import React, { createContext, useContext, useEffect, useRef, useState } from "react";
import { auth } from "./firebase/firebaseConfig";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { toast } from "react-toastify";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const prevUserRef = useRef(null);
  const skipLoginToast = useRef(false); // <-- IMPORTANT

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      const previousUser = prevUserRef.current;

      // Skip toast for new unverified registration
      if (skipLoginToast.current && user && !user.emailVerified) {
        skipLoginToast.current = false;
      } else {
        // Normal login toast (only for verified users)
        if (!previousUser && user && user.emailVerified) {
          toast.success("Logged in successfully!");
        }
      }

      // Logout toast
      if (previousUser && !user) {
        toast.info("Logged out!");
      }

      prevUserRef.current = user;
      setCurrentUser(user);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const logout = async () => {
    try {
      await signOut(auth);
    } catch {
      toast.error("Logout failed!");
    }
  };

  return (
    <AuthContext.Provider value={{ currentUser, logout, skipLoginToast }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
