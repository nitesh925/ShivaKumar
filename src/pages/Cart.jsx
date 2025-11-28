// src/pages/Cart.jsx
import React, { useMemo } from "react";
import { useCart } from "../cartContext";
import "../styles/Cart.css";
import { toast } from "react-toastify";
import { useAuth } from "../authContext";
import { useNavigate } from "react-router-dom";

export default function Cart() {
  const { cart, increaseQty, decreaseQty, removeFromCart } = useCart();
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  const getImage = (img) => {
    if (!img || typeof img !== "string") return "/images/placeholder.png";
    if (img.startsWith("http://") || img.startsWith("https://")) return img;
    if (img.startsWith("/")) return img;
    return `/images/${img}`;
  };

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

  const goToCheckout = () => {
    if (!currentUser) {
      toast.error("Please login before placing an order!");
      return navigate("/login");
    }
    navigate("/checkout");
  };

  return (
    <div className="cart-container">
      {cart.length === 0 ? (
        <div className="empty-cart-wrapper">
          <img src="/images/emptycart.png" className="empty-cart-image" />
          <h2 className="empty-title">I'm Empty!</h2>
          <p className="empty-subtext">Your cart is feeling lonely.</p>
          <button className="go-shopping-btn" onClick={() => navigate("/")}>
            Go Shopping!
          </button>
        </div>
      ) : (
        <>
          <h2 className="cart-heading">
            Keep Nourishing Your Cart With HEALTHINESS 🛒
          </h2>

          <div className="cart-items">
            {cart.map((item) => (
              <div className="cart-item" key={item.id}>
                <img src={getImage(item.image)} className="cart-img" />

                <div className="cart-info">
                  <h4 className="item-title">
                    {item.brand} {item.title}
                  </h4>

                  <div className="price-row">
                    <span className="cut">₹{item.mrp}</span>
                    <span className="price">₹{item.price}</span>
                  </div>

                  <div className="qty-box">
                    <button className="qty-btn" onClick={() => decreaseQty(item.id)}>-</button>
                    <span className="qty-count">{item.qty}</span>
                    <button className="qty-btn" onClick={() => increaseQty(item.id)}>+</button>
                  </div>
                </div>

                <button 
  className="remove-text-btn"
  onClick={() => removeFromCart(item.id)}
>
  Remove
</button>

              </div>
            ))}
          </div>

          <div className="order-summary">
            <h3 className="summary-title">Order Summary</h3>

            <div className="summary-row">
              <p>MRP:</p> <p>₹{mrpTotal}</p>
            </div>

            <div className="summary-row">
              <p>Offer Discount:</p> <p>- ₹{discountTotal}</p>
            </div>

            <div className="summary-row sub-total">
              <p>Sub Total:</p> <p>₹{subTotal}</p>
            </div>

            <hr />

            <div className="final-total">
              <h3>Total Price</h3>
              <h3>₹{subTotal}/-</h3>
            </div>

            <p className="tax-note">(Inclusive of all taxes)</p>
          </div>

          <button className="checkout-btn" onClick={goToCheckout}>
            Place Order Now
          </button>
        </>
      )}
    </div>
  );
}
