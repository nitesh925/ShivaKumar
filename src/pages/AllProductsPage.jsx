import React, { useEffect, useState } from "react";
import { db } from "../firebase/firebaseConfig";
import { collection, getDocs } from "firebase/firestore";
import "../styles/AllProductsPage.css";

const AllProductsPage = () => {
  const [products, setProducts] = useState([]);

  // FETCH PRODUCTS FROM FIRESTORE
  useEffect(() => {
    const fetchProducts = async () => {
      const querySnapshot = await getDocs(collection(db, "products"));
      const prodList = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setProducts(prodList);
    };

    fetchProducts();
  }, []);

  return (
    <div className="products-page">
      <h2 className="title">Our Products</h2>

      {products.length === 0 ? (
        <p className="loading">Loading products...</p>
      ) : (
        <div className="products-grid">
          {products.map((product) => (
            <div className="product-card" key={product.id}>
              <img src={product.image} alt={product.name} />

              <h3>{product.name}</h3>
              <p className="price">₹{product.price}</p>

            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AllProductsPage;
