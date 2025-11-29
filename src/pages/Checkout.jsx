import React, { useState, useEffect } from "react";
import { useCart } from "../cartContext";
import { db } from "../firebase/firebaseConfig";
import { collection, addDoc } from "firebase/firestore";
import { useAuth } from "../authContext";
import "../styles/Checkout.css";

export default function Checkout() {
  const { cart } = useCart();
  const { currentUser } = useAuth();

  const [step, setStep] = useState(1);
  const [phone, setPhone] = useState("");

  const [address, setAddress] = useState({
    name: "",
    house: "",
    area: "",
    city: "",
    pincode: "",
  });

  const totalAmount = cart.reduce(
    (acc, item) => acc + item.price * item.qty,
    0
  );

  // Load Razorpay SDK
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    document.body.appendChild(script);
  }, []);

  const nextStepPhone = () => {
    if (phone.length !== 10) {
      alert("Enter valid 10-digit number");
      return;
    }
    setStep(2);
  };

  // START PAYMENT
  const startPayment = async () => {
    if (!currentUser) {
      alert("Please login to continue");
      return;
    }

    if (typeof window.Razorpay === "undefined") {
      alert("Payment SDK failed to load!");
      return;
    }

    const options = {
      key: "rzp_live_RlDFtwbtIBcTEE",
      amount: totalAmount * 100,
      currency: "INR",
      name: "Siva Kumar General Stores",
      description: "Order Payment",

      handler: async function (response) {
        // After payment success save to firestore
        await saveOrder(response.razorpay_payment_id);
      },

      prefill: {
        contact: phone,
        name: address.name,
      },

      theme: { color: "#ad5617" },
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  // SAVE ORDER TO FIRESTORE
  const saveOrder = async (paymentId) => {
    try {
      const orderData = {
        userId: currentUser.uid,   // 🔥 required for MyOrders filter
        phone,
        address,
        items: cart,
        paymentId,
        totalAmount,
        status: "success",        // 🔥 MyOrders expects this
        createdAt: new Date(),
      };

      await addDoc(collection(db, "orders"), orderData);

      setStep(3);
    } catch (err) {
      console.error(err);
      alert("Order saving failed!");
    }
  };

  return (
    <div className="checkout-page">
      {/* Order Summary */}
      <div className="order-box">
        <h3>Order Summary | {cart.length} items</h3>

        {cart.map((item) => (
  <div className="summary-item" key={item.id}>
    <img src={item.image} alt="" />

    <div className="summary-details">
      <p className="summary-title">{item.title}</p>
    </div>

    <div className="summary-price">
      <p>₹{item.price} × {item.qty}</p>
    </div>
  </div>
))}


        <h2>Total: ₹{totalAmount}</h2>
      </div>

      {/* Step 1: Phone */}
      {step === 1 && (
        <div className="phone-box">
          <h3>Enter your mobile number</h3>

          <input
            type="number"
            placeholder="10-digit mobile number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />

          <button onClick={nextStepPhone}>Next</button>
        </div>
      )}

      {/* Step 2: Address */}
      {step === 2 && (
  <div className="address-box">
    <h3>Delivery Address</h3>

    <input
      placeholder="Full Name"
      value={address.name}
      onChange={(e) => setAddress({ ...address, name: e.target.value })}
    />

    <input
      placeholder="House / Flat No."
      value={address.house}
      onChange={(e) => setAddress({ ...address, house: e.target.value })}
    />

    <input
      placeholder="Area / Colony"
      value={address.area}
      onChange={(e) => setAddress({ ...address, area: e.target.value })}
    />

    <input
      placeholder="City"
      value={address.city}
      onChange={(e) => setAddress({ ...address, city: e.target.value })}
    />

    <input
      placeholder="Pincode (6 digits)"
      value={address.pincode}
      onChange={(e) =>
        setAddress({ ...address, pincode: e.target.value })
      }
    />

    <button
      onClick={() => {
        // Validation
        if (
          address.name.trim() === "" ||
          address.house.trim() === "" ||
          address.area.trim() === "" ||
          address.city.trim() === "" ||
          address.pincode.trim() === ""
        ) {
          alert("Please fill all fields");
          return;
        }

        if (address.pincode.length !== 6) {
          alert("Pincode must be 6 digits");
          return;
        }

        startPayment();
      }}
    >
      Proceed to Pay
    </button>
  </div>
)}

      {/* Step 3: Success */}
      {step === 3 && (
        <div className="success-box">
          <h2>🎉 Order Placed Successfully!</h2>
          <p>Thank you for shopping with us.</p>
        </div>
      )}
    </div>
  );
}