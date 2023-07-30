import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import "./Dashboard.css";
import AddProduct from "./AddProduct/AddProduct";
import ManageProduct from "./ManageProduct/ManageProduct";
import ManageAdmin from "./ManageAdmin/ManageAdmin";
import useGlobalContext from "../../hooks/useGlobalContext";
import ReactLoader from "../../components/ReactLoading/ReactLoader";
import ManageOrders from "./ManageOrders/ManageOrders";
import ShowProducts from "../../components/ShowProducts/ShowProducts";

const Dashboard = () => {
  const [newProduct, setNewProduct] = useState([]);
  const { firebase } = useGlobalContext();
  const { user } = firebase;
  const loaction = useLocation();

  useEffect(() => {
    fetch("http://localhost:5000/products")
      .then((res) => res.json())
      .then((data) => {
        const newData = data.reverse().slice(0, 4);
        setNewProduct(newData);
      });
  }, []);

  return (
    <div className="dashboard container">
      <nav className="dashboard-nav">
        <Link to="/dashboard/addProduct">Add Product</Link>
        <Link to="/dashboard/manageAdmin">Manage Admin</Link>
        <Link to="/dashboard/manageProduct">Manage Products</Link>
        <Link to="/dashboard/manageOrders">Manage Orders</Link>
      </nav>
      <div className="dashboard-content">
        {loaction.pathname === "/dashboard" && (
          <>
            <div className="dasboard-welcome">
              <h2>
                Welcome to your dashboard <span>{user.name}</span> !
              </h2>
            </div>
            <div>
              {newProduct && (
                <ShowProducts
                  page={"dashboard"}
                  title={"Recently added"}
                  products={newProduct}
                />
              )}
            </div>
          </>
        )}
        {loaction.pathname === "/dashboard/addProduct" && <AddProduct />}
        {loaction.pathname === "/dashboard/manageProduct" && <ManageProduct />}
        {loaction.pathname === "/dashboard/manageAdmin" && <ManageAdmin />}
        {loaction.pathname === "/dashboard/manageOrders" && <ManageOrders />}
      </div>
    </div>
  );
};

export default Dashboard;