import React from "react";
import { useCart } from "../cartContext";
import { useNavigate } from "react-router-dom";
import "../styles/Cart.css";

export default function Cart() {
  const { cart, increaseQty, decreaseQty, removeFromCart } = useCart();
  const navigate = useNavigate();

  const calculateTotal = () => {
    return cart.reduce((sum, item) => sum + item.qty * item.price, 0);
  };

  if (cart.length === 0) {
    return (
      <div className="empty-cart-wrapper">
        <img
          src="https://i.ibb.co/6t8cP6W/empty-cart.png"
          alt="empty"
          className="empty-cart-image"
        />
        <p className="empty-title">Your Cart is Empty</p>
        <p className="empty-subtext">Looks like you haven't added anything yet!</p>
        <button className="go-shopping-btn" onClick={() => navigate("/")}>
          Shop Now
        </button>
      </div>
    );
  }
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

    window.open(
      `https://wa.me/${whatsappNumber}?text=${finalMessage}`,
      "_blank"
    );
  };
  return (
    <div className="cart-container">
      <h3 className="cart-heading">Keep Nourishing Your Cart With HEALTHINESS 🛒</h3>

      <div className="cart-items">
        {cart.map((item) => (
          <div className="cart-item" key={item.uniqueId}>
            <img src={item.image} className="cart-img" alt={item.name} />

            <div className="cart-info">
              <p className="item-title">{item.brand} {item.title}</p>

              {/* PRICE ROW */}
              
                <span className="cut">₹{item.mrp} </span>
                
                <span className="price">₹{item.price}</span>
            
              {/* QTY CONTROLS */}
              <div className="qty-box">
                <button className="qty-btn" onClick={() => decreaseQty(item.uniqueId)}>
                  –
                </button>

                <span className="qty-count">{item.qty}</span>

                <button className="qty-btn" onClick={() => increaseQty(item.uniqueId)}>
                  +
                </button>
              </div>
            </div>

            <button className="remove-text-btn" onClick={() => removeFromCart(item.uniqueId)}>
              Remove
            </button>
          </div>
        ))}
      </div>

      {/* ORDER SUMMARY */}
      <div className="order-summary">
  <p className="summary-title">Order Summary</p>

  <div className="summary-list">
    {cart.map((item) => (
      <div className="summary-item" key={item.uniqueId}>
        <span className="summary-name">{item.brand} {item.title}</span>

        <span className="summary-price">
          {item.qty} × ₹{item.price} = ₹{item.qty * item.price}
        </span>
      </div>
    ))}
  </div>

  <hr className="summary-line" />

  <div className="final-total">
    <strong>Total Amount</strong>
    <strong>₹{calculateTotal()}</strong>
  </div>

  <p className="tax-note">Inclusive of all taxes.</p>

  <button className="checkout-btn" onClick={() => navigate("/checkout")}>
    Proceed to Checkout
  </button>
  <div className="manual-order" onClick={sendManualOrder}>
              <p>Order Manually</p>
            </div>
</div>

    </div>
  );
}
