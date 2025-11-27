import React from "react";
import "../styles/Terms.css";

const Terms = () => {
  return (
    <div className="terms-container">
      <h2>Terms & Conditions</h2>

      <p>
        Welcome to our online dry fruits store. By accessing or purchasing from our website, 
        you agree to follow the terms listed below.
      </p>

      <h3>1. Product Quality</h3>
      <p>
        We ensure the best quality dry fruits. However, natural variations in size, color, and texture may occur. 
        Products once opened cannot be returned.
      </p>

      <h3>2. Orders & Pricing</h3>
      <p>
        All prices are subject to change based on market conditions. Orders are confirmed only after 
        payment is successfully processed.
      </p>

      <h3>3. Delivery</h3>
      <p>
        We deliver within Srikakulam district. Delivery times may vary due to location, weather, or 
        logistic delays.
      </p>

      <h3>4. Returns & Refunds</h3>
      <p>
        Returns are accepted only for damaged or wrong items delivered. Proof (photo/video) must be provided 
        within 24 hours of delivery.
      </p>

      <h3>5. Usage of Website</h3>
      <p>
        You agree not to misuse or attempt to harm the website, database, or service in any way.
      </p>

      <h3>6. Changes to Terms</h3>
      <p>
        We may update these terms anytime without prior notice. Continued use of our website means you 
        accept the updated terms.
      </p>
    </div>
  );
};

export default Terms;
