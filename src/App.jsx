import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import { AuthProvider } from "./authContext";
import { CartProvider } from "./cartContext";

import "./styles/App.css";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import BottomNav from "./components/BottomNav";

import Home from "./pages/Home";
import About from "./pages/About";
import Profile from "./pages/Profile";
import Matches from "./pages/Matches";
import Contact from "./pages/Contact";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ServiceDetail from "./pages/ServiceDetail";
import PhonePage from "./pages/PhonePage";
import Cart from "./pages/Cart";
import AlmondsPage from "./pages/AlmondsPage";
import CategoriesPage from "./pages/CategoriesPage";
import AllProductsPage from "./pages/AllProductsPage";
import AddProductPage from "./pages/AddProductPage";
import Terms from "./pages/Terms";
import Privacy from "./pages/Privacy";
import ScrollToTop from "./components/ScrollToTop";
import CategoryProducts from "./pages/CategoryProducts";
import MyOrders from "./pages/myOrders";

import AdminDashboard from "./pages/AdminDashboard";
import AddCategoryPage from "./pages/AddCategory";
import ManageProducts from "./pages/ManageProducts";
import ManageCategories from "./pages/ManageCategories";
import Checkout from "./pages/Checkout";
import AdminRoute from "./components/AdminRoute";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// ----------------------
// HIDE NAVBAR ON THESE PAGES
// ----------------------
const hideNavbarRoutes = ["/login", "/register"];

const App = () => {
  return (
    <AuthProvider>
      <CartProvider>
        <ScrollToTop />

        {/* Hide navbar only on login & register */}
        {!hideNavbarRoutes.includes(window.location.pathname) && <Navbar />}

        <Routes>

          {/* -------------------- LOGIN / REGISTER -------------------- */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* -------------------- PUBLIC ROUTES -------------------- */}
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/matches" element={<Matches />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/booking" element={<PhonePage />} />
          <Route path="/services/:id" element={<ServiceDetail />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/my-orders" element={<MyOrders />} />
          <Route path="/category/:categoryName" element={<CategoryProducts />} />

          <Route path="/categories" element={<CategoriesPage />} />
          <Route path="/allproducts" element={<AllProductsPage />} />
          <Route path="/category/almonds" element={<AlmondsPage />} />

          {/* -------------------- ADMIN ROUTES -------------------- */}
          <Route
            path="/admin"
            element={
              <AdminRoute>
                <AdminDashboard />
              </AdminRoute>
            }
          />

          <Route
            path="/add-product"
            element={
              <AdminRoute>
                <AddProductPage />
              </AdminRoute>
            }
          />

          <Route
            path="/add-category"
            element={
              <AdminRoute>
                <AddCategoryPage />
              </AdminRoute>
            }
          />

          <Route
            path="/manage-products"
            element={
              <AdminRoute>
                <ManageProducts />
              </AdminRoute>
            }
          />

          <Route
            path="/manage-categories"
            element={
              <AdminRoute>
                <ManageCategories />
              </AdminRoute>
            }
          />

          {/* -------------------- NO MATCH -------------------- */}
          <Route path="*" element={<Navigate to="/" />} />

        </Routes>

        {/* Hide footer when no navbar */}
        {!hideNavbarRoutes.includes(window.location.pathname) && <Footer />}
        {!hideNavbarRoutes.includes(window.location.pathname) && <BottomNav />}

        <ToastContainer position="top-center" autoClose={2000} />
      </CartProvider>
    </AuthProvider>
  );
};

export default App;
