import React, { useState } from "react";
import { db } from "../firebase/firebaseConfig";
import { collection, addDoc } from "firebase/firestore";
import "../styles/AddProductPage.css";
import { useAuth } from "../authContext";
import { Navigate } from "react-router-dom";

// All categories including custom option
const categoryList = [
  "driedfruits",
  "dates",
  "nuts",
  "seeds",
  "berries",
  "exoticnuts",
  "mixes",
  "driedmango",
  "others",
];

const AddProductPage = () => {
  const { isAdmin } = useAuth();

  // Non-admin cannot access this page
  if (!isAdmin) return <Navigate to="/" replace />;

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
    customCategory: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    // If user selects anything other than "others", clear custom input
    if (name === "category" && value !== "others") {
      setFormData({
        ...formData,
        category: value,
        customCategory: "",
      });
      return;
    }

    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Required fields
    const required = ["title", "brand", "mrp", "price", "weight", "image", "category"];

    for (let field of required) {
      if (!formData[field]) {
        alert(`${field.toUpperCase()} is required`);
        return;
      }
    }

    // Final category logic
    let finalCategory =
      formData.category === "others"
        ? formData.customCategory.trim()
        : formData.category;

    if (formData.category === "others" && !finalCategory) {
      alert("Please enter a category name for Others");
      return;
    }

    // Format category properly
    finalCategory = finalCategory.toLowerCase().replace(/\s+/g, "");

    try {
      await addDoc(collection(db, "products"), {
        title: formData.title,
        brand: formData.brand,
        rating: formData.rating ? Number(formData.rating) : null,
        mrp: Number(formData.mrp),
        price: Number(formData.price),
        offer: formData.offer || "",
        tag: formData.tag || "",
        weight: formData.weight,
        image: formData.image,
        category: finalCategory,
        createdAt: new Date(),
      });

      alert("✔ Product Added Successfully!");

      // Reset form
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
        customCategory: "",
      });
    } catch (err) {
      console.error("Error adding product:", err);
      if (err.code === "permission-denied") {
        alert("❌ Only admin can add products!");
      } else {
        alert("Error adding product");
      }
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
        <input
          name="image"
          placeholder="Paste image URL"
          value={formData.image}
          onChange={handleChange}
        />

        <label>Category *</label>
        <select name="category" value={formData.category} onChange={handleChange}>
  <option value="">Select Category</option>
  {categoryList.map((cat, i) => (
    <option key={i} value={cat.toLowerCase().replace(/\s+/g, "")}>
      {cat}
    </option>
  ))}
  <option value="others">Others</option>
</select>


        {/* Custom category field when "others" selected */}
        {formData.category === "others" && (
          <>
            <label>Enter Custom Category *</label>
            <input
              name="customCategory"
              placeholder="Example: spices, honey, herbs..."
              value={formData.customCategory}
              onChange={handleChange}
            />
          </>
        )}

        <button type="submit" className="submit-btn">
          Add Product
        </button>
      </form>
    </div>
  );
};

export default AddProductPage;
