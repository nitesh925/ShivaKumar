import React from "react";
import { Link, useLocation } from "react-router-dom";
import HomeIcon from "@mui/icons-material/Home";
import EventIcon from "@mui/icons-material/Event";
import PersonIcon from "@mui/icons-material/Person";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import ContactMailIcon from "@mui/icons-material/ContactMail";
import LoginIcon from '@mui/icons-material/Login';
import SupportAgentIcon from '@mui/icons-material/SupportAgent';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import "../styles/BottomNav.css";

const BottomNav = () => {
  const location = useLocation();

  return (
    <div className="bottom-nav">
      <Link to="/home" className={location.pathname === "/home" ? "active" : ""}>
        <HomeIcon />
        <span>Home</span>
      </Link>
      <Link to="/about" className={location.pathname === "/about" ? "active" : ""}>
        <InfoOutlinedIcon/>
        <span>About Us</span>
      </Link>
      <Link to="/cart" className={location.pathname === "/cart" ? "active" : ""}>
        <ShoppingCartIcon/>
        <span>Cart</span>
      </Link>
      <Link to="/contact" className={location.pathname === "/contact" ? "active" : ""}>
        <SupportAgentIcon/>
        <span>Contact</span>
      </Link>
      <Link to="/login" className={location.pathname === "/login" ? "active" : ""}>
        <LoginIcon/>
        <span>Login</span>
      </Link>
    </div>
  );
};

export default BottomNav;
