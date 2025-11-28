// src/authContext.jsx
import { createContext, useContext, useEffect, useState } from "react";
import { auth } from "./firebase/firebaseConfig";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { toast } from "react-toastify";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (user) => {
      setCurrentUser(user);

      if (user) {
        const token = await user.getIdTokenResult(true);
        setIsAdmin(token.claims.admin === true);
      } else {
        setIsAdmin(false);
      }

      setLoading(false);
    });

    return () => unsub();
  }, []);

  const logout = async () => {
    try {
      await signOut(auth);
      toast.info("Logged out!");
    } catch (err) {
      toast.error("Logout failed!");
    }
  };

  return (
    <AuthContext.Provider value={{ currentUser, isAdmin, logout }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
