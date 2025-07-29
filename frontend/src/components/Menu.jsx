import React from "react";
import { useNavigate } from "react-router-dom";
import Header from "./Header";
import "./Menu.css";

const Menu = () => {
  const navigate = useNavigate();

  const botones = [
    { nombre: "Ingreso de Auto", ruta: "/ingreso" },
    { nombre: "Salida de Auto", ruta: "/egreso" },
    { nombre: "Autos Mensuales", ruta: "/mensuales" },
    { nombre: "Configuraciones", ruta: "/configuraciones" },
    { nombre: "Historial de Autos", ruta: "/historial" },
    { nombre: "Facturación", ruta: "/facturacion" },
  ];

  return (
    <div className="menu-container">
      <h1 className="titulo">ESTACIONAMIENTO</h1>
      <Header />
      <div className="botones-grid">
        {botones.map((btn, index) => (
          <button
            key={index}
            className="menu-btn"
            onClick={() => navigate(btn.ruta)}
          >
            {btn.nombre}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Menu;
