import React, { useState } from "react";
import "../styles/Register.css";
import {
  FaEnvelope, FaPhone, FaLock, FaUser, FaFacebookF, FaGoogle,
} from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { auth, db } from "../firebase/firebaseConfig";

import {
  createUserWithEmailAndPassword,
  updateProfile,
  sendEmailVerification,
  GoogleAuthProvider,
  signInWithPopup
} from "firebase/auth";

import { doc, setDoc, getDoc } from "firebase/firestore";
import { toast } from "react-toastify";
import { useAuth } from "../authContext";

const Register = () => {
  const navigate = useNavigate();
  const { skipLoginToast } = useAuth();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [loading, setLoading] = useState(false);

  const validatePhone = (num) => /^[6-9]\d{9}$/.test(num);

  // -------------------- REGISTER WITH EMAIL --------------------
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
      setErrorMsg("Enter a valid phone number.");
      setLoading(false);
      return;
    }

    try {
      skipLoginToast.current = true;

      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      const user = userCredential.user;

      await updateProfile(user, { displayName: name });
      await sendEmailVerification(user);

      await setDoc(doc(db, "usersData", user.uid), {
        uid: user.uid,
        name,
        email,
        phone,
        createdAt: new Date(),
        emailVerified: false,
      });

      toast.info("Registration successful! Verify your email before logging in.");

      navigate("/login");
    } catch (error) {
      console.log(error);
      setErrorMsg(error.message);
    }

    setLoading(false);
  };

  // -------------------- GOOGLE LOGIN --------------------
  const handleGoogleLogin = async () => {
    setErrorMsg("");
    const provider = new GoogleAuthProvider();

    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      // Check if user already exists in Firestore
      const ref = doc(db, "usersData", user.uid);
      const docSnap = await getDoc(ref);

      if (!docSnap.exists()) {
        // store new Google user
        await setDoc(ref, {
          uid: user.uid,
          name: user.displayName,
          email: user.email,
          phone: "",
          createdAt: new Date(),
          emailVerified: user.emailVerified,
        });
      }

      navigate("/home");
    } catch (error) {
      console.log(error);
      setErrorMsg("Google login failed. Try again.");
    }
  };

  return (
    <div className="register-wrapper">
      <div className="register-card">
        <form className="register-form" onSubmit={handleRegister}>
          {errorMsg && <p className="error-message">{errorMsg}</p>}

          <div className="input-box">
            <FaUser className="icon" />
            <input type="text" placeholder="Full Name"
              value={name} onChange={(e) => setName(e.target.value)} />
          </div>

          <div className="input-box">
            <FaEnvelope className="icon" />
            <input type="email" placeholder="Email"
              value={email} onChange={(e) => setEmail(e.target.value)} />
          </div>

          <div className="input-box">
            <FaPhone className="icon" />
            <input type="text" placeholder="Phone Number"
              value={phone} onChange={(e) => setPhone(e.target.value)} />
          </div>

          <div className="input-box">
            <FaLock className="icon" />
            <input type="password" placeholder="Password"
              value={password} onChange={(e) => setPassword(e.target.value)} />
          </div>

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

          <button className="register-btn" disabled={loading}>
            {loading ? "Registering..." : "Register"}
          </button>

          <p className="login-text">
            Already Registered? <Link to="/login">Login</Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Register;
