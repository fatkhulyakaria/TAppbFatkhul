import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Weapon.css";
import { Link } from "react-router-dom";

const Weapon = () => {
  const [weapons, setWeapons] = useState(null);
  const [query, setQuery] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");
  const [sortBy, setSortBy] = useState("attack");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("https://mhw-db.com/weapons");
        setWeapons(response.data.slice(0, 40));
      } catch (error) {
        console.error("Error fetching weapon data:", error);
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

  if (!weapons) {
    // Loading state or add an error state
    return <div>Loading...</div>;
  }

  const sortedWeapons = [...weapons].sort((a, b) => {
    const order = sortOrder === "asc" ? 1 : -1;

    if (sortBy === "attack") {
      return (a.attack.raw - b.attack.raw) * order;
    } else if (sortBy === "name") {
      const nameA = a.name.toLowerCase();
      const nameB = b.name.toLowerCase();
      return nameA.localeCompare(nameB) * order;
    }

    return 0;
  });

  const filteredWeapons = sortedWeapons.filter((weapon) =>
    weapon.name.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="weapons-container">
      <div className="search-sort-container">
        <div className="search-container">
          <input
            className="search-bar"
            type="text"
            placeholder="Search weapons by name"
            onKeyDown={(e) => onSearch(e)}
          />
        </div>
        <div className="sort-container">
          <button
            className={`sort-button ${sortBy === "attack" && "active"}`}
            onClick={() => handleSort("attack")}
          >
            Sort by Attack {sortOrder === "asc" ? "▲" : "▼"}
          </button>
          <button
            className={`sort-button ${sortBy === "name" && "active"}`}
            onClick={() => handleSort("name")}
          >
            Sort by Name {sortOrder === "asc" ? "▲" : "▼"}
          </button>
        </div>
      </div>
      <ul className="weapons-list">
        {filteredWeapons.map((weapon) => (
          <li key={weapon.id} className="weapons-list-item">
            <Link to={`/weapon/${weapon.id}`}>
              <img
                src={weapon.assets && weapon.assets.image}
                alt={weapon.name}
                className="weapon-icon"
              />
              <p className="weapon-name">{weapon.name}</p>
              <p className="weapon-attack">
                Attack: {weapon.attack && weapon.attack.raw}
              </p>
              {/* Include other weapon details as needed */}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Weapon;
