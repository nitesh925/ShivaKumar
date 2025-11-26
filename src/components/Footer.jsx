import React from "react";
import "../styles/Footer.css";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">

        {/* CONTACT */}
        <div className="footer-section">
          <h3>Contact Us</h3>
          <p>Shiva Kumar General Store<br />
            Near Bus Stop, Kasibugga, Andhra Pradesh 532222</p>

          <p className="footer-icon">
            <span>📨</span> srinusunkari544@gmail.com
          </p>

          <p className="footer-icon">
            <span>📞</span> +(91) 99663 94544
          </p>
        </div>

        {/* USEFUL LINKS */}
        <div className="footer-section">
  <h3>Useful Links</h3>
  <ul>
    <li>
      <Link to="/">Home</Link>
    </li>
    <li>
      <Link to="/about">About us</Link>
    </li>
    <li>
      <Link to="/contact">Contact us</Link>
    </li>
    
    <li>
      <Link to="/terms">Terms & Condition</Link>
    </li>
    <li>
      <Link to="/privacy">Privacy Policy</Link>
    </li>
  </ul>
</div>


        {/* SOCIAL LINKS */}
        <div className="footer-section">
          <h3>Follow Us Now</h3>
          <ul>
            <li>📘 Facebook</li>
            <li>🐦 Twitter</li>
            <li>📸 Instagram</li>
            <li>📍 Pinterest</li>
            <li>💼 Linkedin</li>
          </ul>
        </div>

        {/* RATE LIST */}
        <div className="footer-section">
          <h3>For Complete Menu</h3>
          <p>Click To Download Rate List</p>

          <div className="app-buttons">
            <img src="/google.png" alt="Google Play" />
            <img src="/apple.png" alt="App Store" />
          </div>
        </div>

      </div>

      <p className="footer-bottom">
        ©2023 Zaya Dryfruits By Beacon Coders. All Rights Reserved.
      </p>
    </footer>
  );
};

export default Footer;
