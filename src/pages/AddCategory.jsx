import React, { useState } from "react";
import { db } from "../firebase/firebaseConfig";
import { collection, addDoc } from "firebase/firestore";
import "../styles/AddCategory.css";

const AddCategory = () => {
  const [name, setName] = useState("");
  const [image, setImage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !image) {
      alert("Category name & image required!");
      return;
    }

    try {
      await addDoc(collection(db, "categories"), {
        name: name.trim(),
        image,
        createdAt: new Date(),
      });

      alert("✔ Category added successfully!");
      setName("");
      setImage("");
    } catch (e) {
      console.error(e);
      alert("Failed to add category");
    }
  };

  return (
    <div className="add-category-container">
      <h2>Add New Category</h2>

      <form className="add-category-form" onSubmit={handleSubmit}>
        <label>Category Name *</label>
        <input value={name} onChange={(e) => setName(e.target.value)} />

        <label>Category Image URL *</label>
        <input value={image} onChange={(e) => setImage(e.target.value)} />

        <button className="submit-btn">Add Category</button>
      </form>
    </div>
  );
};

export default AddCategory;
