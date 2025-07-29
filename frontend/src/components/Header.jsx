import React, { useEffect, useState } from "react";

const Header = () => {
  const [cocherasDisponibles, setCocherasDisponibles] = useState(50);

  const obtenerCocheras = async () => {
    try {
      const res = await fetch("http://localhost:5000/autos");
      const data = await res.json();
      const ocupadas = data.length;
      setCocherasDisponibles(50 - ocupadas);
    } catch (error) {
      console.error("Error al obtener cocheras:", error);
    }
  };

  useEffect(() => {
    obtenerCocheras();
    const interval = setInterval(obtenerCocheras, 3000); // refresca cada 3s
    return () => clearInterval(interval);
  }, []);

  return (
    <h3 style={{ textAlign: "center", marginTop: "10px", color: "#333" }}>
      Cocheras disponibles: {cocherasDisponibles} / 50
    </h3>
  );
};

export default Header;
