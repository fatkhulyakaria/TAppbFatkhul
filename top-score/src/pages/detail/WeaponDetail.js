import axios from "axios";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "./WeaponDetail.css";

function WeaponDetail() {
  const { id } = useParams();
  const [weapon, setWeapon] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(`https://mhw-db.com/weapons/${id}`);
        console.log("API response:", response.data);
        if (response.status === 200) {
          setWeapon(response.data);
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
  if (!weapon) {
    return <p>Data tidak tersedia</p>;
  }

  return (
    <div className="weapon-detail">
      <img
        src={weapon.assets && weapon.assets.image}
        alt={weapon.name}
        className="weapon-image"
      />
      <h2>{weapon.name}</h2>
      <p>Type: {weapon.type}</p>
      <p>Rarity: {weapon.rarity}</p>
      <h3>Description:</h3>
      <p className="description">{weapon.description}</p>

      <h3>Attack:</h3>
      <p>Raw Attack: {weapon.attack && weapon.attack.raw}</p>
      <p>Elemental Attack: {weapon.element && weapon.element.damage}</p>

      <h3>Slots:</h3>
      <p>Slot 1: {weapon.slots && weapon.slots[0]}</p>
      <p>Slot 2: {weapon.slots && weapon.slots[1]}</p>
      <p>Slot 3: {weapon.slots && weapon.slots[2]}</p>
      {/* Include other weapon details as needed */}
    </div>
  );
}

export default WeaponDetail;
