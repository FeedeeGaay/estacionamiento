import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "./Header";

const IngresoAuto = () => {
  const [patente, setPatente] = useState("");
  const [autos, setAutos] = useState([]);
  const navigate = useNavigate();

  const obtenerAutos = async () => {
    const res = await fetch("http://localhost:5000/autos");
    const data = await res.json();
    setAutos(data);
  };

  const ingresarAuto = async () => {
    if (!patente) {
      alert("Ingrese una patente");
      return;
    }
    const res = await fetch("http://localhost:5000/ingreso", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ patente }),
    });
    const data = await res.json();
    if (res.ok) {
      alert(data.mensaje);
      setPatente("");
      obtenerAutos();
    } else {
      alert(data.error);
    }
  };

  useEffect(() => {
    obtenerAutos();
  }, []);

  return (
    <div style={{ textAlign: "center", marginTop: "30px", padding: "0 10px" }}>
      <Header />
      <h2>Ingreso de Auto</h2>
      <input
        type="text"
        placeholder="Ingrese patente"
        value={patente}
        onChange={(e) => setPatente(e.target.value)}
        style={{ padding: "10px", fontSize: "16px", marginRight: "10px" }}
      />
      <button onClick={ingresarAuto} style={{ padding: "10px 15px" }}>
        Ingresar
      </button>

      <div style={{ marginTop: "30px", overflowX: "auto" }}>
        <table
          border="1"
          style={{
            margin: "0 auto",
            borderCollapse: "collapse",
            width: "100%",
            maxWidth: "800px",
            fontSize: "14px",
          }}
        >
          <thead>
            <tr>
              <th>Patente</th>
              <th>Fecha Ingreso</th>
              <th>Hora Ingreso</th>
            </tr>
          </thead>
          <tbody>
            {autos.map((auto, index) => (
              <tr key={index}>
                <td>{auto.patente}</td>
                <td>{auto.fechaIngreso}</td>
                <td>{auto.horaIngreso}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div style={{ marginTop: "20px" }}>
        <button onClick={() => navigate("/")} style={{ padding: "10px 15px" }}>
          Volver al menú principal
        </button>
      </div>
    </div>
  );
};

export default IngresoAuto;
