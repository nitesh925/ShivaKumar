import React from "react";
import { Routes, Route } from "react-router-dom";

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
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// ----------------------------
// LAYOUT WRAPPER
// ----------------------------
const Layout = ({ children }) => {
  return (
    <>
      <Navbar />
      {children}
      <Footer />
      <BottomNav />
    </>
  );
};

const App = () => {
  return (
    <>
      <ScrollToTop />

      

          <Routes>

            {/* -------- PUBLIC ROUTES WITHOUT NAVBAR -------- */}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            {/* -------- MAIN WEBSITE ROUTES WITH LAYOUT -------- */}
            <Route
              path="/*"
              element={
                <Layout>
                  <Routes>

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
                    <Route path="/category/:categoryName" element={<CategoryProducts />} />

                    {/* PRODUCT ROUTES */}
                    <Route path="/category/almonds" element={<AlmondsPage />} />
                    <Route path="/categories" element={<CategoriesPage />} />
                    <Route path="/allproducts" element={<AllProductsPage />} />

                    {/* ADMIN */}
                    <Route path="/add-product" element={<AddProductPage />} />

                  </Routes>
                </Layout>
              }
            />

          </Routes>

        

      <ToastContainer position="top-center" autoClose={2000} />
    </>
  );
};

export default App;
