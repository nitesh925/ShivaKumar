import React, { useMemo } from "react";
import { useCart } from "../cartContext";
import "../styles/Cart.css";
import { toast } from "react-toastify";
import { useAuth } from "../authContext";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

export default function Cart() {
  const { cart, increaseQty, decreaseQty, removeFromCart } = useCart();
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  // ---------------- Add Razorpay Script ----------------
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    document.body.appendChild(script);
  }, []);

  // ---------------- CALCULATIONS ----------------
  const { mrpTotal, discountTotal, subTotal } = useMemo(() => {
    let mrp = 0;
    let discount = 0;

    cart.forEach((item) => {
      const itemMRP = item.mrp * item.qty;
      const itemPrice = item.price * item.qty;

      mrp += itemMRP;
      discount += itemMRP - itemPrice;
    });

    return {
      mrpTotal: mrp,
      discountTotal: discount,
      subTotal: mrp - discount,
    };
  }, [cart]);

  const totalAmount = subTotal; // Final payable amount

  // ---------------- RAZORPAY PAYMENT ----------------
  const handlePayment = () => {
    if (!currentUser) {
      toast.error("Please login before placing an order!");
      navigate("/login");
      return;
    }

    if (typeof window.Razorpay === "undefined") {
      toast.error("Payment SDK failed to load. Try again.");
      return;
    }

    const options = {
      key: "rzp_test_RkhFp0n5yUCIfH", // 🔴 Replace with your Razorpay Key
      amount: totalAmount * 100, // convert to paisa
      currency: "INR",
      name: "Siva Kumar General Stores",
      description: "Order Payment",
      image: "/images/SKnew.png",

      handler: function (response) {
        toast.success("Payment Successful!");
        console.log(response);
        navigate("/order-success");
      },

      prefill: {
        name: currentUser?.displayName || "Customer",
        email: currentUser?.email || "customer@example.com",
        contact: "9999999999",
      },

      theme: {
        color: "#ad5617",
      },
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  // ---------------- MANUAL ORDER WHATSAPP ----------------
  const sendManualOrder = () => {
    const orderText = cart
      .map(
        (item) =>
          `${item.title} (${item.qty} qty) - ₹${item.price * item.qty}`
      )
      .join("%0A");

    const total = cart.reduce(
      (acc, item) => acc + item.price * item.qty,
      0
    );

    const finalMessage = `Hello, I would like to place a manual order:%0A%0A${orderText}%0A%0ATotal: ₹${total}/-`;

    const whatsappNumber = "919040555925";

    window.open(`https://wa.me/${whatsappNumber}?text=${finalMessage}`, "_blank");
  };

  return (
    <div className="cart-drawer">
      <h2 className="cart-title">Keep Nourishing Your Cart 🛒</h2>

      {cart.length === 0 ? (
        <div className="empty-box">
          <img src="/empty-cart.png" className="empty-cart-img" />
          <h3>I'm Empty!</h3>
          <p>I've got room for anything.</p>
        </div>
      ) : (
        <div className="cart-items">
          {cart.map((item) => (
            <div className="cart-item" key={item.id}>
              <img src={`/images/${item.image}`} className="cart-img" />

              <div className="cart-info">
                <h4>{item.title}</h4>

                <div className="price-row">
                  <span className="cut">₹{item.mrp}</span>
                  <span className="price">₹{item.price}</span>
                </div>

                <div className="qty-box">
                  <button onClick={() => decreaseQty(item.id)}>-</button>
                  <span>{item.qty}</span>
                  <button onClick={() => increaseQty(item.id)}>+</button>
                </div>
              </div>

              <button
                className="remove-btn"
                onClick={() => removeFromCart(item.id)}
              >
                ✕
              </button>
            </div>
          ))}
        </div>
      )}

      {/* ---------------- ORDER SUMMARY ---------------- */}
      {cart.length > 0 && (
        <div className="order-summary-box">
          <h2>Order Summary</h2>

          <div className="row">
            <p>MRP:</p>
            <p>₹{mrpTotal}</p>
          </div>

          <div className="row">
            <p>Offer Discount</p>
            <p>- ₹{discountTotal}</p>
          </div>

          <div className="row">
            <p>Reward Points</p>
            <p>- ₹0</p>
          </div>

          <div className="row sub">
            <p>Sub-Total:</p>
            <p>₹{subTotal}</p>
          </div>

          <hr />

          <div className="final-row">
            <h3>Total Price</h3>
            <h3>₹{subTotal}/-</h3>
          </div>

          <p className="note">(Inclusive of all taxes)</p>
        </div>
      )}

      {/* ---------------- CHECKOUT BUTTONS ---------------- */}
      {cart.length > 0 && (
        <div className="checkout-bar">
          <button className="checkout-btn" onClick={handlePayment}>
            Place Order Now
          </button>

          <div className="manual-order" onClick={sendManualOrder}>
            <p>Order Manually</p>
          </div>
        </div>
      )}
    </div>
  );
}
