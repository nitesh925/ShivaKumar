import React from "react";
import { useParams } from "react-router-dom";
import almondsData from "../data/almonds.json";
import "../styles/ServiceDetail.css";
import { useCart } from "../cartContext";

const ServiceDetail = () => {
  const { id } = useParams();

  // Get addToCart function
  const { addToCart } = useCart();

  let data = [];

  // match URL with JSON
  if (id === "Almonds") data = almondsData;

  return (
    <div className="service-page">
      <h1 className="service-title">{id}</h1>

      <div className="service-card-container">
        {data.map((item) => (
          <div className="service-card" key={item.id}>
            <img
              src={`/images/${item.image}`}
              alt={item.title}
              className="service-img"
            />

            <div className="badge">{item.tag}</div>
            <div className="discount">{item.discount}</div>

            <h3 className="brand">NUTRAJ</h3>
            <h2 className="title">{item.title}</h2>

            <p className="mrp">
              MRP: <span className="cut">₹{item.mrp}</span> ₹{item.price}
              <span className="per"> (₹{item.price}/{item.weight})</span>
            </p>

            <button className="cart-btn" onClick={() => addToCart(item)}>
              Add To Cart
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ServiceDetail;
