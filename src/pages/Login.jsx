import React, { useState } from "react";
import "../styles/Login.css";
import { FaEnvelope, FaLock, FaFacebookF, FaGoogle } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../firebase/firebaseConfig";
import {
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";

const ADMIN_UID = "eliXhzH33DUQfj9bz1hwmHDRzKP2"; // <-- your admin UID

const Login = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [infoMsg, setInfoMsg] = useState("");

  // --------------------------------------------------------
  // NORMAL USER LOGIN
  // --------------------------------------------------------
  const handleLogin = async (e) => {
    e.preventDefault();
    setErrorMsg("");
    setInfoMsg("");

    if (!email || !password) {
      setErrorMsg("Please enter both email and password.");
      return;
    }

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);

      if (!userCredential.user.emailVerified) {
        setErrorMsg("Please verify your email before logging in.");
        return;
      }

      navigate("/home");
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

  // --------------------------------------------------------
  // ADMIN LOGIN (NO EMAIL VERIFICATION REQUIRED)
  // --------------------------------------------------------
  const handleAdminLogin = async () => {
    setErrorMsg("");

    if (!email || !password) {
      setErrorMsg("Enter admin email & password.");
      return;
    }

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);

      const user = userCredential.user;

      // Check if this is the admin
      if (user.uid !== ADMIN_UID) {
        setErrorMsg("Not an admin account.");
        return;
      }

      // Admin success → redirect
      navigate("/add-product");

    } catch (error) {
      console.log(error);
      setErrorMsg("Admin login failed.");
    }
  };

  // --------------------------------------------------------
  // PASSWORD RESET
  // --------------------------------------------------------
  const handlePasswordReset = async () => {
    setErrorMsg("");
    setInfoMsg("");

    if (!email) {
      setErrorMsg("Enter your email to reset password.");
      return;
    }

    try {
      await sendPasswordResetEmail(auth, email);
      setInfoMsg("Password reset email sent!");
    } catch (error) {
      console.log(error);
      setErrorMsg("Failed to send reset email.");
    }
  };

  // --------------------------------------------------------
  // GOOGLE LOGIN
  // --------------------------------------------------------
  const handleGoogleLogin = async () => {
    setErrorMsg("");
    const provider = new GoogleAuthProvider();

    try {
      const result = await signInWithPopup(auth, provider);
      navigate("/home");
    } catch (error) {
      console.log(error);
      setErrorMsg("Google login failed. Try again.");
    }
  };

  return (
    <div className="login-wrapper">
      <div className="login-card">

        <form className="login-form" onSubmit={handleLogin}>
          
          {errorMsg && <p className="error-message">{errorMsg}</p>}
          {infoMsg && <p className="info-message">{infoMsg}</p>}

          <div className="input-box">
            <FaEnvelope className="icon" />
            <input 
              type="email" 
              placeholder="Email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="input-box">
            <FaLock className="icon" />
            <input 
              type="password" 
              placeholder="Password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <p className="forgot" onClick={handlePasswordReset} style={{cursor: "pointer"}}>
            Forgot Password?
          </p>

          <button className="login-btn">Login</button>

          {/* NEW ADMIN LOGIN BUTTON */}
          <button
            type="button"
            className="login-btn admin-btn"
            onClick={handleAdminLogin}
            style={{ background: "#8b0000", marginTop: "10px" }}
          >
            Admin Login
          </button>

          <div className="divider-with-text">
            <span className="divider-text">Login With</span>
          </div>

          <div className="social-row">
            <div className="social-circle fb">
              <FaFacebookF />
            </div>

            <div className="social-circle google" onClick={handleGoogleLogin}>
              <FaGoogle />
            </div>
          </div>

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
