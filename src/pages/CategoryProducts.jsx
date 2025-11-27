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

// ⭐ AUTO OFFER CALCULATION FUNCTION
const getOffer = (product) => {
  if (isValid(product.offer)) {
    return product.offer; // Use existing offer
  }

  // If no MRP or price, cannot calculate
  if (!product.mrp || !product.price || product.mrp <= 0) {
    return null;
  }

  // Calculate offer %
  const discount = ((product.mrp - product.price) / product.mrp) * 100;

  if (discount <= 0) return null;

  return Math.round(discount); // return rounded %
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
            const calculatedOffer = getOffer(product); // ⭐ Auto-offer result

            return (
              <div key={product.id} className="product-card">

                {/* TAG LEFT */}
                {isValid(product.tag) && (
                  <span className="tag-left">{product.tag}</span>
                )}

                {/* OFFER RIGHT */}
                {calculatedOffer && (
                  <span className="tag-right">{calculatedOffer}% off</span>
                )}

                {/* IMAGE */}
                {isValid(product.image) ? (
                  <img
                    src={product.image}
                    alt={product.title}
                    className="product-img"
                  />
                ) : (
                  <div className="image-placeholder"></div>
                )}

                {/* BRAND + RATING */}
                <div className="brand-rating">
                  <span className="brand">{product.brand}</span>

                  {isValid(product.rating) && (
                    <span className="rating">⭐ {product.rating}</span>
                  )}
                </div>

                {/* TITLE */}
                <p className="product-title">{product.title}</p>

                {/* PRICE */}
                <p className="product-price">
                  {isValid(product.mrp) && (
                    <span className="mrp">₹{product.mrp}</span>
                  )}
                  <span className="final-price">₹{product.price}</span>
                </p>

                {/* WEIGHT */}
                {isValid(product.weight) && (
                  <p className="weight">({product.weight})</p>
                )}

                {/* ADD TO CART */}
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
