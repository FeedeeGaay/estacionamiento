import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "./Header";

const Configuraciones = () => {
  const [tarifa, setTarifa] = useState("");
  const navigate = useNavigate();

  const cargarTarifa = async () => {
    const res = await fetch("http://localhost:5000/tarifa");
    const data = await res.json();
    setTarifa(data.tarifaHora);
  };

  useEffect(() => {
    cargarTarifa();
  }, []);

  const actualizarTarifa = async () => {
    const res = await fetch("http://localhost:5000/tarifa", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ tarifaHora: tarifa }),
    });

    if (res.ok) {
      alert("Tarifa actualizada correctamente");
      navigate("/");
    } else {
      alert("Error al actualizar tarifa");
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <Header />
      <h2>Configuraciones</h2>
      <label style={{ marginRight: "10px" }}>Tarifa por hora ($):</label>
      <input
        type="number"
        value={tarifa}
        onChange={(e) => setTarifa(e.target.value)}
        style={{ padding: "10px", fontSize: "16px", width: "100px" }}
      />
      <div style={{ marginTop: "20px" }}>
        <button
          onClick={actualizarTarifa}
          style={{
            padding: "10px 20px",
            backgroundColor: "blue",
            color: "white",
            border: "none",
            borderRadius: "5px",
            marginRight: "10px",
          }}
        >
          Guardar
        </button>
        <button onClick={() => navigate("/")} style={{ padding: "10px 15px" }}>
          Volver al menú principal
        </button>
      </div>
    </div>
  );
};

export default Configuraciones;
