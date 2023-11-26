import React from "react";
import "./App.css";
import Armor from "./pages/Armor";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/header";
import Weapon from "./pages/Weapon";
import About from "./pages/about";
import Armordetail from "./pages/detail/ArmorDetail";
import WeaponDetail from "./pages/detail/WeaponDetail";
function App() {
  return (
    <div className="App">
      <Router>
        <Header />
        <Routes>
          <Route exact path="/" element={<Armor />} />
          <Route exact path="/Armor" element={<Armor />} />
          <Route exact path="/Weapon" element={<Weapon />} />
          <Route exact path="/about" element={<About />} />
          <Route exact path="/armor/:id" element={<Armordetail />} />
          <Route exact path="/weapon/:id" element={<WeaponDetail />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
