import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { db } from "../firebase/firebaseConfig";
import { collection, getDocs } from "firebase/firestore";
import { useCart } from "../cartContext";
import "../styles/CategoryProducts.css";
import ProductLoader from "../components/ProductLoader";

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
    const load = async () => {
      try {
        const snapshot = await getDocs(collection(db, "products"));
        const list = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        const filtered = list.filter(
          (item) =>
            item.category &&
            item.category.toLowerCase() === categoryName.toLowerCase()
        );

        setProducts(filtered);
      } catch (error) {
        console.error("Error fetching products", error);
      } finally {
        setLoading(false);
      }
    };

    load();
  }, [categoryName]);



if (loading) {
  return (
    <div className="product-grid">
      {[1,2,3,4,5,6].map((i) => (
        <ProductLoader key={i} />
      ))}
    </div>
  );
}



  return (
    <div className="category-products-container">
      <h2 className="category-products-title">{categoryName}</h2>

      {products.length === 0 ? (
        <p className="no-products">No products found.</p>
      ) : (
        <div className="products-grid">
          {products.map((product) => {
            const offer = getOffer(product);

            return (
              <div key={product.id} className="product-card">

                <Link to={`/product/${product.id}`} className="click-area">

                  {isValid(product.tag) && (
                    <span className="tag-left">{product.tag}</span>
                  )}

                  {offer && <span className="tag-right">{offer}% Off</span>}

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
                </Link>

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
