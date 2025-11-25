import React, { useState } from "react";
import "../styles/Login.css";
import { FaEnvelope, FaLock, FaFacebookF, FaGoogle } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../firebase/firebaseConfig";
import { signInWithEmailAndPassword, sendPasswordResetEmail } from "firebase/auth";

const Login = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [infoMsg, setInfoMsg] = useState("");

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

      // Check if email is verified
      if (!userCredential.user.emailVerified) {
        setErrorMsg("Please verify your email before logging in.");
        return;
      }

      alert("Login Successful!");
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


  // ✅ Reset Password Function
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


  return (
    <div className="login-wrapper">
      <div className="login-card">

        <form className="login-form" onSubmit={handleLogin}>
          
          {errorMsg && <p className="error-message">{errorMsg}</p>}
          {infoMsg && <p className="info-message">{infoMsg}</p>}

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

          {/* Forgot Password */}
          <p className="forgot" onClick={handlePasswordReset} style={{cursor: "pointer"}}>
            Forgot Password?
          </p>

          <div className="divider-with-text">
            <span className="divider-text">Login With</span>
          </div>

          {/* Social Icons */}
          <div className="social-row">
            <div className="social-circle fb"><FaFacebookF /></div>
            <div className="social-circle google"><FaGoogle /></div>
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
