import React, { useState } from "react";
import { db } from "../firebase/firebaseConfig"; 
import { collection, addDoc } from "firebase/firestore";

const AddProductPage = () => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [category, setCategory] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !price || !imageUrl || !category) {
      alert("Please fill all fields");
      return;
    }

    try {
      await addDoc(collection(db, "products"), {
        name,
        price: Number(price),
        imageUrl,
        category,
        createdAt: new Date(),
      });

      alert("Product Added Successfully!");

      setName("");
      setPrice("");
      setImageUrl("");
      setCategory("");

    } catch (err) {
      console.error(err);
      alert("Error adding product");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Add New Product</h2>

      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", maxWidth: "350px" }}>
        
        <label>Product Name</label>
        <input value={name} onChange={(e) => setName(e.target.value)} />

        <label>Price</label>
        <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} />

        <label>Image URL</label>
        <input value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} />

        <label>Category</label>
        <input value={category} onChange={(e) => setCategory(e.target.value)} />

        <button type="submit" style={{ marginTop: "15px" }}>Add Product</button>
      </form>
    </div>
  );
};

export default AddProductPage;
