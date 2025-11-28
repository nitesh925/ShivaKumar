import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { db } from "../firebase/firebaseConfig";
import { collection, getDocs } from "firebase/firestore";
import "../styles/CategoriesPage.css";

const CategoriesPage = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    const snapshot = await getDocs(collection(db, "categories"));
    const list = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    setCategories(list);
  };

  return (
    <div className="categories-container">
      <h1 className="categories-title">Shop by Category</h1>

      <div className="categories-grid">
        {categories.map((cat) => (
          <Link
            to={`/category/${cat.name.toLowerCase().replace(/\s+/g, "")}`}
            key={cat.id}
            className="category-card"
          >
            <img src={cat.image} alt={cat.name} className="category-img" />
            <p className="category-name">{cat.name}</p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default CategoriesPage;
