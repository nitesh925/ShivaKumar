import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../authContext";
import "../styles/AdminDashboard.css";
const AdminDashboard = () => {
  const { isAdmin } = useAuth();

  // Block non-admin users
  if (!isAdmin) {
    return <h2 style={{ textAlign: "center", marginTop: "40px" }}>Unauthorized</h2>;
  }

  return (
    <div className="admin-dashboard">
      <h1>Admin Panel</h1>

      <div className="admin-options">

        <Link to="/add-product" className="admin-btn">
          ➕ Add New Product
        </Link>

        <Link to="/add-category" className="admin-btn">
          📂 Add New Category
        </Link>

        <Link to="/manage-products" className="admin-btn">
          🛒 Manage Products (CRUD)
        </Link>

        <Link to="/manage-categories" className="admin-btn">
          📦 Manage Categories (CRUD)
        </Link>

      </div>
    </div>
  );
};

export default AdminDashboard;
