import React from "react";
import { NavLink } from "react-router-dom";
import "./index.css";

export default function Header() {
  return (
    <header className="header">
      <div className="logo-container">
        <img
          src="https://1000logos.net/wp-content/uploads/2021/07/Monster-Hunter-Logo.png"
          alt="Monster Hunter Logo"
          className="logo"
        />
      </div>
      <nav className="navbar">
        <NavLink to="/Armor" className="nav-link">
          Armor
        </NavLink>
        <NavLink to="/Weapon" className="nav-link">
          Weapon
        </NavLink>
        <NavLink to="/about" className="nav-link">
          About
        </NavLink>
      </nav>
    </header>
  );
}
