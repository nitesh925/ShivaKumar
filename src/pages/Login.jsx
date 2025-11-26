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

const Login = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [infoMsg, setInfoMsg] = useState("");

  // --------------------------------------------------------
  // EMAIL + PASSWORD LOGIN
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
      setInfoMsg("Password reset email sent! Check your inbox.");
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

      const user = result.user;

      // Google accounts are already verified
      if (!user.emailVerified && user.providerData[0].providerId === "password") {
        setErrorMsg("Please verify your email first.");
        return;
      }

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

          <div className="divider-with-text">
            <span className="divider-text">Login With</span>
          </div>

          <div className="social-row">
            <div className="social-circle fb">
              <FaFacebookF />
            </div>

            {/* GOOGLE LOGIN BUTTON */}
            <div className="social-circle google" onClick={handleGoogleLogin}>
              <FaGoogle />
            </div>
          </div>

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
