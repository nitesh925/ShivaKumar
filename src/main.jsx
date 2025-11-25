import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./authContext";
import App from "./App";
import "./index.css"; // Ensure global styles are imported
import { CartProvider } from "./cartContext";
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    
    <BrowserRouter>
      <AuthProvider>
        <CartProvider>
        <App />
        </CartProvider>
      </AuthProvider>
    </BrowserRouter>
    
  </React.StrictMode>
);
