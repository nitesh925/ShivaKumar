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
      navigate("/login");
      return;
    }
    navigate("/checkout");
  };

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
    <div className="cart-drawer">
      {cart.length === 0 ? (
        <div className="empty-cart-wrapper">
          <img
            src="/images/emptycart.png"
            alt="Empty Cart"
            className="empty-cart-image"
          />
          <h2 className="empty-title">I'm Empty!</h2>
          <p className="empty-subtext">Your cart is feeling lonely.</p>
          <button className="go-shopping-btn" onClick={() => navigate("/")}>
            Go Shopping!
          </button>
        </div>
      ) : (
        <>
          <div className="cart-items">
            <h2 className="cart-title">Keep Nourishing Your Cart 🛒</h2>

            {cart.map((item) => (
              <div className="cart-item" key={item.id}>
                <img
                  src={getImage(item.image)}
                  className="cart-img"
                />

                <div className="cart-info">
                  <h4>
                    {item.brand} {item.title}
                  </h4>
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

          <div className="checkout-bar">
            <button className="checkout-btn" onClick={goToCheckout}>
              Place Order Now
            </button>

            <div className="manual-order" onClick={sendManualOrder}>
              <p>Order Manually</p>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
