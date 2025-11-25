import React from "react";
import { useCart } from "../cartContext";
import "../styles/Cart.css";

export default function Cart() {
  const { cart, increaseQty, decreaseQty, removeFromCart } = useCart();

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

      {cart.length > 0 && (
        <div className="checkout-bar">
          <button className="checkout-btn">Place Order Now</button>
        </div>
      )}
    </div>
  );
}
