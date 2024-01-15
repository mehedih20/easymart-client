import React, { useState } from "react";
import headerlogo from "../../assets/EasyMart-logo.webp";
import {
  BsCartCheck,
  BsCart,
  BsChevronDown,
  BsHeadphones,
} from "react-icons/bs";
import {
  AiOutlineLogin,
  AiOutlineSearch,
  AiOutlineLogout,
} from "react-icons/ai";
import { BiCategory } from "react-icons/bi";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import "./Navigation.css";
import CategoriesHover from "../CategoriesHover/CategoriesHover";
import useGlobalContext from "../../hooks/useGlobalContext";

const Navigation = () => {
  const [isCartEmpty, setIsCartEmpty] = useState(true);
  const [showCategories, setShowCategories] = useState(false);
  const navigate = useNavigate();
  const { firebase } = useGlobalContext();
  const { auth, signOut, user, setUser } = firebase;
  const { pathname } = useLocation();

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        console.log("Sign out successful");
      })
      .catch((error) => console.log(error));
    setUser(null);
    navigate("/");
  };

  return (
    <header>
      <div className="container">
        <div className="header-top">
          <div className="header-top-left">
            <img src={headerlogo} alt="header-logo" />
            <div className="header-top-search">
              <input type="search" placeholder="Search for items.." />
              <button>
                <AiOutlineSearch />
              </button>
            </div>
          </div>
          <div className="header-top-right">
            <button onClick={() => navigate("/cart")}>
              {isCartEmpty ? <BsCart /> : <BsCartCheck />} Cart
            </button>
            {user ? (
              <button onClick={handleLogout}>
                <AiOutlineLogout /> Log out
              </button>
            ) : (
              <button onClick={() => navigate("/login")}>
                <AiOutlineLogin /> Login / Sign up
              </button>
            )}
            {user && <p>{user.name}</p>}
          </div>
        </div>
        <nav className="header-nav">
          <div className="header-nav-left">
            <button
              className="header-nav-left-btn"
              style={{ color: "var(--color-primary)" }}
              onClick={() => setShowCategories(!showCategories)}
            >
              <BiCategory style={{ marginRight: "1rem" }} /> Categories{" "}
              <BsChevronDown />{" "}
              <CategoriesHover showCategories={showCategories} />
            </button>
            <NavLink
              className={`${pathname === "/" && "color-primary"}`}
              to="/"
            >
              Home
            </NavLink>
            <NavLink
              className={`${pathname === "/products" && "color-primary"}`}
              to="/products"
            >
              Products
            </NavLink>
            <NavLink
              className={`${pathname === "/about" && "color-primary"}`}
              to="/about"
            >
              About
            </NavLink>
            <NavLink
              className={`${pathname === "/contact" && "color-primary"}`}
              to="/contact"
            >
              Contact
            </NavLink>
            {user && (
              <NavLink
                className={`${pathname === "/dashboard" && "color-primary"}`}
                to="/dashboard"
              >
                Dashboard
              </NavLink>
            )}
          </div>
          <div className="header-nav-right">
            <BsHeadphones />
            <div className="header-nav-right-text">
              <p>+123-444-555</p>
              <small>24/7 Support Center</small>
            </div>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Navigation;
