import React, { useState } from "react";
import { db } from "../firebase/firebaseConfig";
import { collection, addDoc } from "firebase/firestore";
import "../styles/AddProductPage.css";

const AddProductPage = () => {
  const [formData, setFormData] = useState({
    title: "",
    brand: "",
    rating: "",
    mrp: "",
    price: "",
    offer: "",
    tag: "",
    weight: "",
    image: "",
    category: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // REQUIRED FIELDS ONLY
    const requiredFields = ["title", "brand", "mrp", "price", "weight", "image", "category"];

    for (const field of requiredFields) {
      if (!formData[field]) {
        alert(`${field.toUpperCase()} is required`);
        return;
      }
    }

    try {
      await addDoc(collection(db, "products"), {
        ...formData,
        rating: formData.rating ? Number(formData.rating) : null,
        mrp: Number(formData.mrp),
        price: Number(formData.price),
        createdAt: new Date(),
      });

      alert("Product Added Successfully!");

      setFormData({
        title: "",
        brand: "",
        rating: "",
        mrp: "",
        price: "",
        offer: "",
        tag: "",
        weight: "",
        image: "",
        category: "",
      });
    } catch (err) {
      console.error(err);
      alert("Error adding product");
    }
  };

  return (
    <div className="add-product-container">
      <h2>Add New Product</h2>

      <form className="add-product-form" onSubmit={handleSubmit}>
        
        <label>Title *</label>
        <input name="title" value={formData.title} onChange={handleChange} />

        <label>Brand *</label>
        <input name="brand" value={formData.brand} onChange={handleChange} />

        <label>Rating (Optional)</label>
        <input
          type="number"
          step="0.1"
          name="rating"
          value={formData.rating}
          onChange={handleChange}
        />

        <label>MRP *</label>
        <input
          type="number"
          name="mrp"
          value={formData.mrp}
          onChange={handleChange}
        />

        <label>Price *</label>
        <input
          type="number"
          name="price"
          value={formData.price}
          onChange={handleChange}
        />

        <label>Offer (Optional)</label>
        <input name="offer" value={formData.offer} onChange={handleChange} />

        <label>Tag (Optional)</label>
        <input name="tag" value={formData.tag} onChange={handleChange} />

        <label>Weight *</label>
        <input name="weight" value={formData.weight} onChange={handleChange} />

        <label>Image URL *</label>
        <input name="image" value={formData.image} onChange={handleChange} />

        <label>Category *</label>
        <input
          name="category"
          value={formData.category}
          onChange={handleChange}
        />

        <button type="submit" className="submit-btn">Add Product</button>
      </form>
    </div>
  );
};

export default AddProductPage;
