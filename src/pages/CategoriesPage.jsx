import React from "react";
import { Link } from "react-router-dom";
import "../styles/CategoriesPage.css";

const categories = [
  { name: "Nuts", image: "/images/nuts.jpg", path: "/category/nuts" },
  { name: "Dried Fruits", image: "/images/driedfruits.jpg", path: "/category/driedfruits" },
  { name: "Dates", image: "/images/dates.jpg", path: "/category/dates" },
  { name: "Seeds", image: "/images/seeds.jpg", path: "/category/seeds" },
  { name: "Berries", image: "/images/berries.jpg", path: "/category/berries" },
  { name: "Exotic Nuts", image: "/images/exoticnuts.jpg", path: "/category/exoticnuts" },
  { name: "Mixes", image: "/images/mixes.jpg", path: "/category/mixes" },
  { name: "Whole Spices", image: "/images/spices.jpg", path: "/category/spices" },
];

const CategoriesPage = () => {
  return (
    <div className="categories-container">
      <h1 className="categories-title">Shop by Category</h1>

      <div className="categories-grid">
        {categories.map((cat, index) => (
          <Link to={cat.path} key={index} className="category-card">
            <img src={cat.image} alt={cat.name} className="category-img" />
            <p className="category-name">{cat.name}</p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default CategoriesPage;
