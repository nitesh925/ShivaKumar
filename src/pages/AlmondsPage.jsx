import React, { useEffect, useState } from "react";
import almondsData from "../data/almonds.json";
import "../styles/ProductCard.css";
import { toast } from "react-toastify";

const AlmondsPage = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    setProducts(almondsData);
  }, []);

  const handleAddToCart = (item) => {
    // Add cart logic later if needed

    toast.success(`${item.title} added to cart!`, {
      position: "top-center",
      autoClose: 1200,
    });
  };

  return (
    <div className="category-page">
      <h2 className="category-title">Almonds</h2>

      <div className="product-grid">
        {products.map((item) => (
          <div className="product-card" key={item.id}>
            
            {item.badge && <div className="badge">{item.badge}</div>}
            {item.discount && <div className="discount">{item.discount}</div>}

            <img src={item.image} alt={item.title} className="product-img" />

            <div className="product-info">
              <h4 className="brand">{item.brand}</h4>

              <div className="rating">⭐ {item.rating}</div>

              <p className="title">{item.title}</p>

              <p className="price-row">
                MRP: <span className="mrp">{item.mrp}</span>
                <span className="price">{item.price}</span>
              </p>

              <p className="per100">({item.per100})</p>

              <button 
                className="add-btn"
                onClick={() => handleAddToCart(item)}
              >
                Add To Cart
              </button>

            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AlmondsPage;
