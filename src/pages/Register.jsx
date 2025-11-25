import React, { useState } from "react";
import "../styles/Register.css";
import { FaEnvelope, FaPhone, FaLock, FaUser, FaFacebookF, FaGoogle } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { auth, db } from "../firebase/firebaseConfig";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";

const Register = () => {
  const navigate = useNavigate();

  const [name, setName] = useState("");   // <-- Added Name
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [loading, setLoading] = useState(false);

  const handleRegister = async (e) => {
    e.preventDefault();
    setErrorMsg("");
    setLoading(true);

    if (!name || !email || !phone || !password) {
      setErrorMsg("All fields are required!");
      setLoading(false);
      return;
    }

    try {
      // Create User in Firebase Auth
      // Create User in Firebase Auth
const userCredential = await createUserWithEmailAndPassword(auth, email, password);

// ✅ Update Firebase Auth displayName
await updateProfile(userCredential.user, {
  displayName: name
});

// Save User to Firestore
await setDoc(doc(db, "users", userCredential.user.uid), {
  name: name,
  email: email,
  phone: phone,
  createdAt: new Date(),
});


      alert("Registration Successful!");
      navigate("/home");

    } catch (error) {
      console.error(error);
      setErrorMsg(error.message);
    }

    setLoading(false);
  };

  return (
    <div className="register-wrapper">
      <div className="register-card">
        <form className="register-form" onSubmit={handleRegister}>

          {errorMsg && <p className="error-message">{errorMsg}</p>}

          {/* Name */}
          <div className="input-box">
            <FaUser className="icon" />
            <input 
              type="text" 
              placeholder="Full Name" 
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

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

          {/* Phone */}
          <div className="input-box">
            <FaPhone className="icon" />
            <input 
              type="text" 
              placeholder="Phone Number" 
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
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

          {/* Divider */}
          <div className="divider-with-text">
            <span className="divider-text">Sign Up With</span>
          </div>

          {/* Social Icons */}
          <div className="social-row">
            <div className="social-circle fb">
              <FaFacebookF />
            </div>
            <div className="social-circle google">
              <FaGoogle />
            </div>
          </div>

          {/* Register Button */}
          <button className="register-btn" disabled={loading}>
            {loading ? "Registering..." : "Register"}
          </button>

          <p className="login-text">
            Already Registered?{" "}
            <Link to="/login" className="login-link">Login</Link>
          </p>

        </form>
      </div>
    </div>
  );
};

export default Register;
