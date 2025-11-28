import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../authContext";
import "../styles/Navbar.css";
import { useCart } from "../cartContext";

import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";

const Navbar = () => {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();
  const { cart } = useCart();

  const cartCount = cart.reduce((a, b) => a + b.qty, 0);

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [openCategory, setOpenCategory] = useState(null);

  const toggleCategory = (name) => {
    setOpenCategory(openCategory === name ? null : name);
  };

  const handleLogout = () => {
    logout();
    setIsSidebarOpen(false);
  };

  useEffect(() => {
    document.body.style.overflow = isSidebarOpen ? "hidden" : "auto";
  }, [isSidebarOpen]);

  const categories = [
    "Dried Fruits",
    "Dates",
    "Nuts",
    "Seeds",
    "Berries",
    "Exotic Nuts",
    "Mixes",
    "Dry Mango",
    "Gifting",
  ];

  return (
    <>
      {/* TOP NAVBAR */}
      <nav className="navbar">
        <div className="navbar-container">

          {/* LEFT MENU ICON */}
          <div className="left-menu" onClick={() => setIsSidebarOpen(true)}>
            <MenuIcon />
          </div>

          {/* LOGO CENTER */}
          <div className="navbar-logo" onClick={() => navigate("/home")}>
            <img src="/images/SKnew.png" alt="SK Logo" className="logo-img" />
          </div>

          {/* RIGHT CART ICON */}
          <div className="right-cart" onClick={() => navigate("/cart")}>
            <ShoppingCartOutlinedIcon />
            {cartCount > 0 && <span className="cart-count">{cartCount}</span>}
          </div>
        </div>
      </nav>

      {/* SIDEBAR */}
      <div className={`sidebar ${isSidebarOpen ? "open" : ""}`}>
        <div className="sidebar-header">
          {currentUser ? `Hi, ${currentUser.displayName || "User"}` : "Shop"}
          <CloseIcon className="close-icon" onClick={() => setIsSidebarOpen(false)} />
        </div>

        {/* AUTH BUTTONS */}
        {!currentUser && (
          <div className="auth-buttons">
            <Link to="/login" className="login-btn" onClick={() => setIsSidebarOpen(false)}>
              Login
            </Link>
            <Link to="/register" className="signup-btn" onClick={() => setIsSidebarOpen(false)}>
              Sign up →
            </Link>
          </div>
        )}

        {/* MY ORDERS LINK */}
        {currentUser && (
          <ul className="sidebar-links">
            <li>
              <Link to="/my-orders" onClick={() => setIsSidebarOpen(false)}>
                📦 My Orders
              </Link>
            </li>
          </ul>
        )}

        {/* CATEGORY LIST */}
        <ul className="sidebar-links">
          {categories.map((cat) => (
            <li key={cat}>
              <div className="category-row" onClick={() => toggleCategory(cat)}>
                {cat}
                {openCategory === cat ? <ExpandLessIcon /> : <ExpandMoreIcon />}
              </div>

              {openCategory === cat && (
                <ul className="submenu">
                  <li>
                    <Link
                      to={`/category/${cat}`}
                      onClick={() => setIsSidebarOpen(false)}
                    >
                      View All
                    </Link>
                  </li>
                </ul>
              )}
            </li>
          ))}
        </ul>

        {/* LOGOUT */}
        {currentUser && (
          <Link to="/" className="logout-btn" onClick={handleLogout}>
            Logout
          </Link>
        )}
      </div>

      {isSidebarOpen && (
        <div className="overlay" onClick={() => setIsSidebarOpen(false)}></div>
      )}
    </>
  );
};

export default Navbar;
