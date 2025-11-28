// src/cartContext.jsx
import { createContext, useContext, useState, useEffect } from "react";
import { db } from "./firebase/firebaseConfig";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { useAuth } from "./authContext";
import { toast } from "react-toastify";

const CartContext = createContext();

export function CartProvider({ children }) {
  const { currentUser } = useAuth() || {};
  const [cart, setCart] = useState([]);

  // Load user cart
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

  // Save to DB
  const saveToDB = async (updatedCart) => {
    if (!currentUser) return;
    await setDoc(doc(db, "users", currentUser.uid), { cart: updatedCart }, { merge: true });
  };

  // Add to cart
  const addToCart = (item) => {
    setCart((prev) => {
      const exists = prev.find((i) => i.id === item.id);

      const updatedCart = exists
        ? prev.map((i) => (i.id === item.id ? { ...i, qty: i.qty + 1 } : i))
        : [...prev, { ...item, qty: 1 }];

      saveToDB(updatedCart);
      toast.success("Added to cart!");

      return updatedCart;
    });
  };

  // Remove item
  const removeFromCart = (id) => {
    setCart((prev) => {
      const updated = prev.filter((i) => i.id !== id);
      saveToDB(updated);
      toast.info("Item removed!");
      return updated;
    });
  };

  // Increase qty
  const increaseQty = (id) => {
    setCart((prev) => {
      const updated = prev.map((i) =>
        i.id === id ? { ...i, qty: i.qty + 1 } : i
      );
      saveToDB(updated);
      toast.success("Quantity increased!");
      return updated;
    });
  };

  // Decrease qty
  const decreaseQty = (id) => {
    setCart((prev) => {
      const updated = prev.map((i) =>
        i.id === id && i.qty > 1 ? { ...i, qty: i.qty - 1 } : i
      );
      saveToDB(updated);
      toast.warning("Quantity decreased!");
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
}

// ------------------------------------
// HOOK PLACED AT VERY END (Vite fix)
// ------------------------------------
export function useCart() {
  return useContext(CartContext);
}
