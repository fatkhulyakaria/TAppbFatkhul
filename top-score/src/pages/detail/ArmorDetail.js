import axios from "axios";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "./ArmorDetail.css";

function ArmorDetail() {
  const { id } = useParams();
  const [armor, setArmor] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(`https://mhw-db.com/armor/${id}`);
        console.log("API response:", response.data);
        if (response.status === 200) {
          setArmor(response.data);
          setIsLoading(false);
        }
      } catch (err) {
        console.log(err);
        setIsLoading(false);
      }
    };

    fetchData();
  }, [id]);

  if (isLoading) {
    return <p>Loading...</p>;
  }
  if (!armor) {
    return <p>Data tidak tersedia</p>;
  }

  return (
    <div className="armor-detail">
      <img
        src={armor.assets && armor.assets.imageMale}
        alt={armor.name}
        className="armor-image"
      />
      <h2>{armor.name}</h2>
      <p>Type: {armor.type}</p>
      <p>Rank: {armor.rank}</p>
      <h3>Description:</h3>
      <p className="description">{armor.description}</p>

      <h3>Defense:</h3>
      <p>Base Defense: {armor.defense && armor.defense.base}</p>
      <p>Max Defense: {armor.defense && armor.defense.max}</p>

      <h3>Resistances:</h3>
      <p>Fire Resistance: {armor.resistances && armor.resistances.fire}</p>
      <p>Water Resistance: {armor.resistances && armor.resistances.water}</p>
      {/* Include other armor details as needed */}
    </div>
  );
}

export default ArmorDetail;
