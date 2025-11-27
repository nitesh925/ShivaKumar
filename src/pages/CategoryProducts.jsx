import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { db } from "../firebase/firebaseConfig";
import { collection, getDocs } from "firebase/firestore";
import { useCart } from "../cartContext";
import "../styles/CategoryProducts.css";

const isValid = (value) => {
  if (!value) return false;
  const invalid = ["", " ", "NA", "na", "N/A", undefined, null];
  return !invalid.includes(value);
};

const getOffer = (product) => {
  if (isValid(product.offer)) return product.offer;

  if (!product.mrp || !product.price || product.mrp <= 0) return null;

  const discount = ((product.mrp - product.price) / product.mrp) * 100;
  if (discount <= 0) return null;

  return Math.round(discount);
};

const CategoryProducts = () => {
  const { categoryName } = useParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { addToCart } = useCart();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const snapshot = await getDocs(collection(db, "products"));
        const allProducts = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        // 🔥 FIX HERE → convert both sides to lowercase
        const filtered = allProducts.filter(
          (item) =>
            item.category &&
            item.category.toLowerCase() === categoryName.toLowerCase()
        );

        setProducts(filtered);
      } catch (err) {
        console.error("Error fetching products:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [categoryName]);

  if (loading) return <p className="loading">Loading products...</p>;

  return (
    <div className="category-products-container">
      <h2 className="category-products-title">{categoryName}</h2>

      {products.length === 0 ? (
        <p className="no-products">No products found in this category.</p>
      ) : (
        <div className="products-grid">
          {products.map((product) => {
            const calculatedOffer = getOffer(product);

            return (
              <div key={product.id} className="product-card">
                {isValid(product.tag) && (
                  <span className="tag-left">{product.tag}</span>
                )}

                {calculatedOffer && (
                  <span className="tag-right">{calculatedOffer}% off</span>
                )}

                {isValid(product.image) ? (
                  <img
                    src={product.image}
                    alt={product.title}
                    className="product-img"
                  />
                ) : (
                  <div className="image-placeholder"></div>
                )}

                <div className="brand-rating">
                  <span className="brand">{product.brand}</span>
                  {isValid(product.rating) && (
                    <span className="rating">⭐ {product.rating}</span>
                  )}
                </div>

                <p className="product-title">{product.title}</p>

                <p className="product-price">
                  {isValid(product.mrp) && (
                    <span className="mrp">₹{product.mrp}</span>
                  )}
                  <span className="final-price">₹{product.price}</span>
                </p>

                {isValid(product.weight) && (
                  <p className="weight">({product.weight})</p>
                )}

                <button
                  className="add-cart-btn"
                  onClick={() => addToCart(product)}
                >
                  Add To Cart
                </button>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default CategoryProducts;
