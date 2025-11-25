import React, { useState } from "react";
import "../styles/Register.css";
import {
  FaEnvelope,
  FaPhone,
  FaLock,
  FaUser,
  FaFacebookF,
  FaGoogle,
} from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { auth, db } from "../firebase/firebaseConfig";
import {
  createUserWithEmailAndPassword,
  updateProfile,
  sendEmailVerification,
} from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";

const Register = () => {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [loading, setLoading] = useState(false);

  const validatePhone = (num) => {
    return /^[6-9]\d{9}$/.test(num); // Indian format — Free simple validation
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setErrorMsg("");
    setLoading(true);

    if (!name || !email || !phone || !password) {
      setErrorMsg("All fields are required!");
      setLoading(false);
      return;
    }

    if (!validatePhone(phone)) {
      setErrorMsg("Enter a valid Indian phone number.");
      setLoading(false);
      return;
    }

    try {
      // Create user
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      const user = userCredential.user;

      // Update display name
      await updateProfile(user, {
        displayName: name,
      });

      // Send Email Verification
      await sendEmailVerification(user);

      // Save user info in Firestore collection
      await setDoc(doc(db, "usersData", user.uid), {
        uid: user.uid,
        name: name,
        email: email,
        phone: phone,
        createdAt: new Date(),
        emailVerified: false,
      });

      alert(
        "Registration successful! Please verify your email before logging in."
      );

      navigate("/login");

    } catch (error) {
      console.log("Error:", error);
      setErrorMsg(error.message);
    }

    setLoading(false);
  };

  return (
    <div className="register-wrapper">
      <div className="register-card">
        <form className="register-form" onSubmit={handleRegister}>
          {errorMsg && <p className="error-message">{errorMsg}</p>}

          <div className="input-box">
            <FaUser className="icon" />
            <input
              type="text"
              placeholder="Full Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

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
            <FaPhone className="icon" />
            <input
              type="text"
              placeholder="Phone Number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
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

          <div className="divider-with-text">
            <span className="divider-text">Sign Up With</span>
          </div>

          <div className="social-row">
            <div className="social-circle fb">
              <FaFacebookF />
            </div>
            <div className="social-circle google">
              <FaGoogle />
            </div>
          </div>

          <button className="register-btn" disabled={loading}>
            {loading ? "Registering..." : "Register"}
          </button>

          <p className="login-text">
            Already Registered?{" "}
            <Link to="/login" className="login-link">
              Login
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Register;
