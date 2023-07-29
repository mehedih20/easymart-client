import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navigation from "./components/Navigation/Navigation";
import Footer from "./components/Footer/Footer";
import Home from "./pages/Home/Home";
import Category from "./pages/Category/Category";
import Deals from "./pages/Deals/Deals";
import Contact from "./pages/Contact/Contact";
import Blogs from "./pages/Blogs/Blogs";
import About from "./pages/About/About";
import NotFound from "./pages/NotFound/NotFound";
import Login from "./pages/Login/Login";
import Cart from "./pages/Cart/Cart";
import Dashboard from "./pages/Dashboard/Dashboard";
import AddProduct from "./pages/Dashboard/AddProduct/AddProduct";
import ManageProduct from "./pages/Dashboard/ManageProduct/ManageProduct";
import ManageAdmin from "./pages/Dashboard/ManageAdmin/ManageAdmin";
import ProtectedRoute from "./Protected/ProtectedRoute";
import ManageOrders from "./pages/Dashboard/ManageOrders/ManageOrders";

const App = () => {
  return (
    <Router>
      <Navigation />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/category/:catName" element={<Category />} />
        <Route path="/deals" element={<Deals />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/blogs" element={<Blogs />} />
        <Route path="/about" element={<About />} />
        <Route path="/login" element={<Login />} />
        <Route path="/cart" element={<Cart />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        >
          <Route path="/dashboard/addProduct" element={<AddProduct />} />
          <Route path="/dashboard/manageProduct" element={<ManageProduct />} />
          <Route path="/dashboard/manageAdmin" element={<ManageAdmin />} />
          <Route path="/dashboard/manageOrders" element={<ManageOrders />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </Router>
  );
};

export default App;
