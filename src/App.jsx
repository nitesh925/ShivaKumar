import React from "react";
import { Routes, Route } from "react-router-dom";

import { AuthProvider } from "./authContext";
import { CartProvider } from "./cartContext";

import "./styles/App.css";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import BottomNav from "./components/BottomNav";

import Home from "./pages/Home";
import About from "./pages/About";
import Profile from "./pages/Profile";
import Matches from "./pages/Matches";
import Contact from "./pages/Contact";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ServiceDetail from "./pages/ServiceDetail";
import EntryPage from "./pages/Entry";
import PhonePage from "./pages/PhonePage";
import Cart from "./pages/Cart";
import AlmondsPage from "./pages/AlmondsPage";

const App = () => {
  return (
    <div className="app-container">
      {/* ⭐ CartProvider ALWAYS outside so cart works everywhere */}
      <CartProvider>
        {/* ⭐ AuthProvider inside */}
        <AuthProvider>
          <Navbar />

          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/home" element={<Home />} />
            <Route path="/booking" element={<PhonePage />} />
            <Route path="/about" element={<About />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/matches" element={<Matches />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/services/:id" element={<ServiceDetail />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/cart" element={<Cart />} />

            {/* Categories */}
            <Route path="/category/almonds" element={<AlmondsPage />} />
          </Routes>

          <Footer />
          <BottomNav />
        </AuthProvider>
      </CartProvider>
    </div>
  );
};

export default App;
