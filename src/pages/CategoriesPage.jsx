import React from "react";
import { Link } from "react-router-dom";
import "../styles/CategoriesPage.css";

const categories = [
  { name: "Dried Fruits", image: "/images/driedfruits.png", path: "/category/driedfruits" },
  { name: "Dates", image: "/images/datess.png", path: "/category/dates" },
  { name: "Nuts", image: "/images/nuts.png", path: "/category/nuts" },
  { name: "Seeds", image: "/images/seeds.png", path: "/category/seeds" },
  { name: "Berries", image: "/images/berries.png", path: "/category/berries" },
  { name: "Exotic Nuts", image: "/images/exoticnuts.png", path: "/category/exoticnuts" },
  { name: "Mixes", image: "/images/mixes.png", path: "/category/mixes" },
  { name: "Dry Mango", image: "/images/driedmango.png", path: "/category/driedmango" },
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
