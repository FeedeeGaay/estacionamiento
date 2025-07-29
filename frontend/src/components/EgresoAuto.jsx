import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "./Header";

const EgresoAuto = () => {
  const [patente, setPatente] = useState("");
  const [auto, setAuto] = useState(null);
  const navigate = useNavigate();

  const buscarAuto = async () => {
    const res = await fetch(`http://localhost:5000/egreso/${patente}`);
    const data = await res.json();
    if (res.ok) {
      setAuto(data);
    } else {
      alert(data.error);
      setAuto(null);
    }
  };

  const finalizarTurno = async () => {
    await fetch(`http://localhost:5000/egreso/${patente}`, { method: "DELETE" });
    alert("Turno finalizado");
    navigate("/");
  };

  return (
    <div style={{ textAlign: "center", marginTop: "30px" }}>
      <Header />
      <h2>Salida de Auto</h2>
      <input
        type="text"
        placeholder="Ingrese patente"
        value={patente}
        onChange={(e) => setPatente(e.target.value)}
        style={{ padding: "10px", fontSize: "16px", marginRight: "10px" }}
      />
      <button onClick={buscarAuto} style={{ padding: "10px 15px" }}>
        Buscar
      </button>

      {auto && (
        <div style={{ marginTop: "20px" }}>
          <table
            border="1"
            style={{
              margin: "0 auto",
              borderCollapse: "collapse",
              width: "90%",
              maxWidth: "800px"
            }}
          >
            <thead>
              <tr>
                <th>Patente</th>
                <th>Hora Ingreso</th>
                <th>Hora Egreso</th>
                <th>Tiempo Dentro</th>
                <th>Monto ($)</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{auto.patente}</td>
                <td>{auto.horaIngreso}</td>
                <td>{auto.horaEgreso}</td>
                <td>{auto.tiempoDentro}</td>
                <td>{auto.monto}</td>
              </tr>
            </tbody>
          </table>

          <div style={{ marginTop: "20px" }}>
            <button
              onClick={finalizarTurno}
              style={{
                padding: "10px 15px",
                backgroundColor: "green",
                color: "white",
                marginRight: "10px"
              }}
            >
              Finalizar turno
            </button>
            <button onClick={() => navigate("/")} style={{ padding: "10px 15px" }}>
              Volver al menú principal
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default EgresoAuto;
