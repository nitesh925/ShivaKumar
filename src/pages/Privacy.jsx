import React from "react";
import "../styles/Privacy.css";

const Privacy = () => {
  return (
    <div className="privacy-container">
      <h2>Privacy Policy</h2>

      <p>
        Your privacy is important to us. This policy explains how we collect, use, and protect 
        your personal information.
      </p>

      <h3>1. Information We Collect</h3>
      <p>
        We collect your name, mobile number, delivery address, and order details to fulfill 
        your purchases. We do not collect unnecessary or sensitive personal information.
      </p>

      <h3>2. Use of Information</h3>
      <p>
        Your information is used strictly for processing orders, deliveries, customer support, 
        and improving our service.
      </p>

      <h3>3. Data Protection</h3>
      <p>
        We do not share or sell your data. Your information is stored securely and accessed only 
        by authorized personnel.
      </p>

      <h3>4. Cookies</h3>
      <p>
        Our website may use cookies to improve user experience and loading speed. You may disable 
        cookies in browser settings.
      </p>

      <h3>5. Third-Party Services</h3>
      <p>
        Payment gateways or delivery partners may require some user information to complete your order. 
        They follow strict privacy rules.
      </p>

      <h3>6. Changes to Privacy Policy</h3>
      <p>
        We may update this policy occasionally. By using our website, you agree to the latest version 
        of this privacy policy.
      </p>
    </div>
  );
};

export default Privacy;
