import React, { useEffect, useState } from "react";
import { db } from "../firebase/firebaseConfig";
import {
  collection,
  getDocs,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore";
import { useAuth } from "../authContext";
import { Navigate } from "react-router-dom";
import "../styles/ManageProducts.css";

const ManageProducts = () => {
  const { isAdmin } = useAuth();
  if (!isAdmin) return <Navigate to="/" replace />;

  const [products, setProducts] = useState([]);
  const [editingProduct, setEditingProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch all products
  const fetchProducts = async () => {
    const snapshot = await getDocs(collection(db, "products"));
    let list = [];
    snapshot.forEach((doc) =>
      list.push({ id: doc.id, ...doc.data() })
    );
    setProducts(list);
    setLoading(false);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // Delete product
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this product?")) return;
    await deleteDoc(doc(db, "products", id));
    alert("Product deleted!");
    fetchProducts();
  };

  // Save edited product
  const handleEditSave = async () => {
    const docRef = doc(db, "products", editingProduct.id);

    await updateDoc(docRef, {
      title: editingProduct.title,
      price: Number(editingProduct.price),
      mrp: Number(editingProduct.mrp),
      brand: editingProduct.brand,
      image: editingProduct.image,
      weight: editingProduct.weight,
      tag: editingProduct.tag,
      category: editingProduct.category,
    });

    alert("Product updated!");
    setEditingProduct(null);
    fetchProducts();
  };

  return (
    <div className="manage-container">
      <h1>Manage Products</h1>

      {loading ? (
        <p>Loading products...</p>
      ) : (
        <div className="product-grid">
          {products.map((p) => (
            <div key={p.id} className="product-card-admin">
              <img src={p.image} alt={p.title} className="product-img-admin" />

              <h3>{p.title}</h3>
              <p>Brand: {p.brand}</p>
              <p>Category: {p.category}</p>
              <p>MRP: ₹{p.mrp}</p>
              <p>Price: ₹{p.price}</p>
              <p>Weight: {p.weight}</p>

              <div className="admin-buttons">
                <button
                  className="edit-btn"
                  onClick={() => setEditingProduct(p)}
                >
                  Edit
                </button>
                <button
                  className="delete-btn"
                  onClick={() => handleDelete(p.id)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* -------- EDIT MODAL -------- */}
      {editingProduct && (
        <div className="edit-modal">
          <div className="edit-box">
            <h2>Edit Product</h2>

            <input
              value={editingProduct.title}
              onChange={(e) =>
                setEditingProduct({ ...editingProduct, title: e.target.value })
              }
            />
            <input
              value={editingProduct.brand}
              onChange={(e) =>
                setEditingProduct({ ...editingProduct, brand: e.target.value })
              }
            />
            <input
              type="number"
              value={editingProduct.mrp}
              onChange={(e) =>
                setEditingProduct({ ...editingProduct, mrp: e.target.value })
              }
            />
            <input
              type="number"
              value={editingProduct.price}
              onChange={(e) =>
                setEditingProduct({ ...editingProduct, price: e.target.value })
              }
            />
            <input
              value={editingProduct.weight}
              onChange={(e) =>
                setEditingProduct({ ...editingProduct, weight: e.target.value })
              }
            />
            <input
              value={editingProduct.tag}
              onChange={(e) =>
                setEditingProduct({ ...editingProduct, tag: e.target.value })
              }
            />
            <input
              value={editingProduct.category}
              onChange={(e) =>
                setEditingProduct({
                  ...editingProduct,
                  category: e.target.value.toLowerCase().replace(/\s+/g, ""),
                })
              }
            />

            <input
              value={editingProduct.image}
              onChange={(e) =>
                setEditingProduct({ ...editingProduct, image: e.target.value })
              }
            />

            <div className="edit-actions">
              <button onClick={handleEditSave} className="save-btn">
                Save
              </button>
              <button
                className="cancel-btn"
                onClick={() => setEditingProduct(null)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageProducts;
