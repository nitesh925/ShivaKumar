import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { db } from "../firebase/firebaseConfig";
import { collection, getDocs } from "firebase/firestore";
import "../styles/ServiceDetail.css";
import { useCart } from "../cartContext";
import ProductLoader from "../components/ProductLoader";

const ServiceDetail = () => {
  const { id } = useParams(); // Almonds, Cashews, Dates...
  const { addToCart } = useCart();

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchProducts = async () => {
  try {
    const snapshot = await getDocs(collection(db, "products"));
    const allProducts = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    const filtered = allProducts.filter((p) =>
      p.title.toLowerCase().includes(id.toLowerCase()) ||
      p.category?.toLowerCase().includes(id.toLowerCase())
    );

    setProducts(filtered);
    setLoading(false);
  } catch (error) {
    console.error("Error fetching products:", error);
  }
};


  useEffect(() => {
    fetchProducts();
  }, [id]);

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
    <div className="service-page">
      <h1 className="service-title">{id}</h1>

      {products.length === 0 ? (
        <p className="no-products">No products found for {id}</p>
      ) : (
        <div className="service-card-container">
          {products.map((item) => (
            <div className="service-card" key={item.id}>
              <img
                src={item.image}
                alt={item.title}
                className="service-img"
              />

              {item.tag && <div className="badge">{item.tag}</div>}
              {item.discount && <div className="discount">{item.discount}% off</div>}

              <h3 className="brand">{item.brand || "NUTRAJ"}</h3>
              <h2 className="title">{item.title}</h2>

              <p className="mrp">
                {item.mrp && (
                  <>
                    MRP: <span className="cut">₹{item.mrp}</span>{" "}
                  </>
                )}
                ₹{item.price}
                {item.weight && (
                  <span className="per"> (₹{item.price}/{item.weight})</span>
                )}
              </p>

              <button className="cart-btn" onClick={() => addToCart(item)}>
                Add To Cart
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ServiceDetail;
