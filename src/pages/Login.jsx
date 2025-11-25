import React, { useState } from "react";
import "../styles/Login.css";
import { FaEnvelope, FaLock, FaFacebookF, FaGoogle } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../firebase/firebaseConfig";
import { signInWithEmailAndPassword } from "firebase/auth";

const Login = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setErrorMsg("");

    if (!email || !password) {
      setErrorMsg("Please enter both email and password.");
      return;
    }

    try {
      // Firebase Login
      await signInWithEmailAndPassword(auth, email, password);

      alert("Login Successful!");
      navigate("/home"); // Redirect to home page

    } catch (error) {
      console.log(error);

      if (error.code === "auth/user-not-found") {
        setErrorMsg("No user found with this email.");
      } else if (error.code === "auth/wrong-password") {
        setErrorMsg("Incorrect password.");
      } else {
        setErrorMsg("Login failed. Try again.");
      }
    }
  };

  return (
    <div className="login-wrapper">
      <div className="login-card">
        
        <form className="login-form" onSubmit={handleLogin}>

          {errorMsg && <p className="error-message">{errorMsg}</p>}

          {/* Email */}
          <div className="input-box">
            <FaEnvelope className="icon" />
            <input 
              type="email" 
              placeholder="Email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          {/* Password */}
          <div className="input-box">
            <FaLock className="icon" />
            <input 
              type="password" 
              placeholder="Password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <p className="forgot">Forgot Password</p>

          {/* Divider */}
          <div className="divider-with-text">
            <span className="divider-text">Login With</span>
          </div>

          {/* Social Icons */}
          <div className="social-row">
            <div className="social-circle fb"><FaFacebookF /></div>
            <div className="social-circle google"><FaGoogle /></div>
          </div>

          {/* Login Button */}
          <button className="login-btn">Login</button>

          <p className="signup-text">
            Not A Registered User?{" "}
            <Link to="/register" className="signup-link">Sign Up</Link>
          </p>

        </form>
      </div>
    </div>
  );
};

export default Login;
