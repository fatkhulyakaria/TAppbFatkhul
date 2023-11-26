import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Armor.css";
import { Link } from "react-router-dom";

const Armor = () => {
  const [armorData, setArmorData] = useState(null);
  const [query, setQuery] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");
  const [sortBy, setSortBy] = useState("defense");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("https://mhw-db.com/armor");
        setArmorData(response.data.slice(17, 57));
      } catch (error) {
        console.error("Error fetching armor data:", error);
      }
    };

    fetchData();
  }, []);

  const onSearch = (e) => {
    if (e.key === "Enter") {
      setQuery(e.target.value);
    }
  };

  const handleSort = (property) => {
    setSortBy(property);
    setSortOrder((prevSortOrder) => (prevSortOrder === "asc" ? "desc" : "asc"));
  };

  if (!armorData) {
    // Loading state or add an error state
    return <div>Loading...</div>;
  }

  const sortedArmor = [...armorData].sort((a, b) => {
    const order = sortOrder === "asc" ? 1 : -1;

    if (sortBy === "defense") {
      return (a.defense.base - b.defense.base) * order;
    } else if (sortBy === "name") {
      const nameA = a.name.toLowerCase();
      const nameB = b.name.toLowerCase();
      return nameA.localeCompare(nameB) * order;
    }

    return 0;
  });

  const filteredArmor = sortedArmor.filter((armor) =>
    armor.name.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="armor-container">
      <div className="search-sort-container">
        <div className="search-container">
          <input
            className="search-bar"
            type="text"
            placeholder="Search armor by name"
            onKeyDown={(e) => onSearch(e)}
          />
        </div>
        <div className="sort-container">
          <button
            className={`sort-button ${sortBy === "defense" && "active"}`}
            onClick={() => handleSort("defense")}
          >
            Sort by Defense {sortOrder === "asc" ? "▲" : "▼"}
          </button>
          <button
            className={`sort-button ${sortBy === "name" && "active"}`}
            onClick={() => handleSort("name")}
          >
            Sort by Name {sortOrder === "asc" ? "▲" : "▼"}
          </button>
        </div>
      </div>
      <ul className="armor-list">
        {filteredArmor.map((armor) => (
          <li key={armor.id} className="armor-list-item">
            <Link to={`/armor/${armor.id}`}>
              <img
                src={armor.assets && armor.assets.imageMale}
                alt={armor.name}
                className="armor-image"
              />
              <p className="armor-name">{armor.name}</p>
              <p className="armor-defense">
                Defense: {armor.defense && armor.defense.base}
              </p>
              <p className="armor-resistances">
                Fire Resistance: {armor.resistances && armor.resistances.fire}
              </p>
            </Link>
            {/* Include other armor details as needed */}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Armor;
