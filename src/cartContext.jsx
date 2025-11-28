// src/cartContext.jsx
import { createContext, useContext, useState, useEffect } from "react";
import { db } from "./firebase/firebaseConfig";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { useAuth } from "./authContext";
import { toast } from "react-toastify";

const CartContext = createContext(null);

export const CartProvider = ({ children }) => {
  const { currentUser } = useAuth() || {};   // SAFE fallback
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const loadCart = async () => {
      if (!currentUser) {
        setCart([]); 
        return;
      }

      const ref = doc(db, "users", currentUser.uid);
      const snap = await getDoc(ref);
      if (snap.exists()) {
        setCart(snap.data().cart || []);
      }
    };

    loadCart();
  }, [currentUser]);

  const saveToDB = async (updatedCart) => {
    if (!currentUser) return;
    const ref = doc(db, "users", currentUser.uid);
    await setDoc(ref, { cart: updatedCart }, { merge: true });
  };

  const addToCart = (item) => {
    setCart((prev) => {
      const exists = prev.find((i) => i.id === item.id);
      const updatedCart = exists
        ? prev.map((i) =>
            i.id === item.id ? { ...i, qty: i.qty + 1 } : i
          )
        : [...prev, { ...item, qty: 1 }];

      saveToDB(updatedCart);
      toast.success("Added to cart!");
      return updatedCart;
    });
  };

  const removeFromCart = (id) => {
    setCart((prev) => {
      const updatedCart = prev.filter((i) => i.id !== id);
      saveToDB(updatedCart);
      toast.info("Item removed!");
      return updatedCart;
    });
  };

  const increaseQty = (id) => {
    setCart((prev) => {
      const updated = prev.map((i) =>
        i.id === id ? { ...i, qty: i.qty + 1 } : i
      );
      saveToDB(updated);
      return updated;
    });
  };

  const decreaseQty = (id) => {
    setCart((prev) => {
      const updated = prev.map((i) =>
        i.id === id && i.qty > 1
          ? { ...i, qty: i.qty - 1 }
          : i
      );
      saveToDB(updated);
      return updated;
    });
  };

  return (
    <CartContext.Provider
      value={{ cart, addToCart, removeFromCart, increaseQty, decreaseQty }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
