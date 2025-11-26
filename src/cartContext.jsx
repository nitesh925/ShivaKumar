// cartContext.jsx
import { createContext, useContext, useState, useEffect } from "react";
import { auth } from "./firebase/firebaseConfig";
import { db } from "./firebase/firebaseConfig";

import { doc, setDoc, getDoc } from "firebase/firestore";
import { useAuth } from "./authContext";

import { toast } from "react-toastify";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const { currentUser } = useAuth();
  const [cart, setCart] = useState([]);

  // Load cart from Firestore when logged in
  useEffect(() => {
    const loadCart = async () => {
      if (!currentUser) {
        setCart([]); // guest user → empty cart
        return;
      }

      const ref = doc(db, "users", currentUser.uid);
      const snap = await getDoc(ref);

      if (snap.exists() && snap.data().cart) {
        setCart(snap.data().cart);
      }
    };

    loadCart();
  }, [currentUser]);

  // Save cart to Firestore
  const saveToDB = async (updatedCart) => {
    if (!currentUser) return;

    const ref = doc(db, "users", currentUser.uid);
    await setDoc(ref, { cart: updatedCart }, { merge: true });
  };

  // Add Item
  const addToCart = (item) => {
    setCart((prev) => {
      const exists = prev.find((i) => i.id === item.id);
      let updatedCart;

      if (exists) {
        updatedCart = prev.map((i) =>
          i.id === item.id ? { ...i, qty: i.qty + 1 } : i
        );
      } else {
        updatedCart = [...prev, { ...item, qty: 1 }];
        toast.success("Added to cart");
      }

      saveToDB(updatedCart);

      // 🔥 SUCCESS POPUP
      toast.success("Item added to cart!");

      return updatedCart;
    });
  };

  // Remove item
  const removeFromCart = (id) => {
    setCart((prev) => {
      const updatedCart = prev.filter((item) => item.id !== id);
      saveToDB(updatedCart);

      toast.info("Item removed!");

      return updatedCart;
    });
  };

  // Increase Qty
  const increaseQty = (id) => {
    setCart((prev) => {
      const updatedCart = prev.map((item) =>
        item.id === id ? { ...item, qty: item.qty + 1 } : item
      );
      saveToDB(updatedCart);

      toast.success("Quantity increased");

      return updatedCart;
    });
  };

  // Decrease Qty
  const decreaseQty = (id) => {
    setCart((prev) => {
      const updatedCart = prev.map((item) =>
        item.id === id && item.qty > 1
          ? { ...item, qty: item.qty - 1 }
          : item
      );
      saveToDB(updatedCart);

      toast.warning("Quantity decreased");

      return updatedCart;
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
