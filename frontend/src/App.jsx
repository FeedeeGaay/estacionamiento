import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Menu from "./components/Menu";
import IngresoAuto from "./components/IngresoAuto";
import EgresoAuto from "./components/EgresoAuto";
import Configuraciones from "./components/configuraciones";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Menu />} />
        <Route path="/ingreso" element={<IngresoAuto />} />
        <Route path="/egreso" element={<EgresoAuto />} />
        <Route path="/configuraciones" element={<Configuraciones />} />
      </Routes>
    </Router>
  );
}

export default App;
