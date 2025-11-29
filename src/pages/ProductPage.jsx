// src/pages/ProductPage.jsx
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { db } from "../firebase/firebaseConfig";
import { doc, getDoc } from "firebase/firestore";
import { useCart } from "../cartContext";
import "../styles/ProductPage.css";

export default function ProductPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [qty, setQty] = useState(1);
  const [timeLeft, setTimeLeft] = useState({});

  const { addToCart } = useCart(); // 🔥 removed buyNowItem

  useEffect(() => {
    const loadProduct = async () => {
      const ref = doc(db, "products", id);
      const snap = await getDoc(ref);

      if (snap.exists()) {
        setProduct(snap.data());
      }

      startTimer();
    };

    loadProduct();
  }, [id]);

  const startTimer = () => {
    const endTime = Date.now() + 24 * 60 * 60 * 1000;

    setInterval(() => {
      const diff = endTime - Date.now();

      setTimeLeft({
        h: Math.floor(diff / (1000 * 60 * 60)),
        m: Math.floor((diff / (1000 * 60)) % 60),
        s: Math.floor((diff / 1000) % 60),
      });
    }, 1000);
  };

  if (!product) return <p>Loading...</p>;

  return (
    <div className="product-page">

      {/* Product Image */}
      <img src={product.image} className="product-main-img" alt="product" />

      <h2 className="title">
        {product.brand} {product.title}
      </h2>

      {/* Price Section */}
      <div className="price-row">
        <div className="price-left">
          <p className="mrp-line">
            MRP: <span className="mrp-cut">₹{product.mrp}</span>
            {product.mrp && product.price && (
              <span className="save-amount">
                Save ₹{product.mrp - product.price}
              </span>
            )}
          </p>

          <p className="final-price-line">
            <span className="final-price-big">₹{product.price}</span>
            <span className="incl-text"> incl. of all taxes</span>
          </p>
        </div>

        <div className="price-right">
          {product.weight && (
            <p className="per-unit">
              (₹{product.price}/{product.weight})
            </p>
          )}
        </div>
      </div>

      <hr />

      {/* Quantity Selection */}
      <div className="qty-section">
        <p className="label">Quantity</p>

        <div className="qty-controls">
          <button onClick={() => qty > 1 && setQty(qty - 1)}>-</button>
          <span>{qty}</span>
          <button onClick={() => setQty(qty + 1)}>+</button>
        </div>
      </div>

      {/* Add To Cart */}
      <button
        className="add-btn"
        onClick={() => addToCart({ ...product, id, qty })}
      >
        Add To Cart
      </button>

      {/* Buy It Now — Add directly to cart then redirect */}
      <button
        className="buy-btn"
        onClick={async () => {
          await addToCart({ ...product, id, qty });
          navigate("/cart");
        }}
      >
        Buy It Now
      </button>

      {/* Pincode Check Box */}
      <div className="pincode-box">
        <input type="number" placeholder="Enter Pincode" />
        <button>Check</button>
      </div>

    </div>
  );
}
