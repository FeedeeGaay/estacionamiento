const express = require('express');
const router = express.Router();
const db = require('../database/db');

// 🔹 Obtener todos los autos dentro
router.get('/autos', (req, res) => {
  db.all('SELECT * FROM autos', [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

// 🔹 Ingreso de auto
router.post('/ingreso', (req, res) => {
  const { patente } = req.body;
  const fecha = new Date();
  const fechaIngreso = fecha.toLocaleDateString();
  const horaIngreso = fecha.toLocaleTimeString();

  db.run(
    'INSERT INTO autos (patente, fechaIngreso, horaIngreso) VALUES (?, ?, ?)',
    [patente.toUpperCase(), fechaIngreso, horaIngreso],
    function (err) {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ mensaje: 'Auto ingresado con éxito' });
    }
  );
});

// 🔹 Buscar auto para egreso con cálculo de tiempo
router.get('/egreso/:patente', (req, res) => {
  const { patente } = req.params;

  db.get('SELECT * FROM autos WHERE patente = ?', [patente.toUpperCase()], (err, row) => {
    if (err) return res.status(500).json({ error: err.message });
    if (!row) return res.status(404).json({ error: 'Auto no encontrado' });

    db.get("SELECT tarifaHora FROM configuracion WHERE id = 1", (err, config) => {
      if (err) return res.status(500).json({ error: err.message });

      const fechaHoraIngreso = new Date(`${row.fechaIngreso} ${row.horaIngreso}`);
      const fechaHoraEgreso = new Date();

      const tiempoMs = fechaHoraEgreso - fechaHoraIngreso;
      const horasTotales = Math.floor(tiempoMs / (1000 * 60 * 60));
      const minutosTotales = Math.floor((tiempoMs % (1000 * 60 * 60)) / (1000 * 60));

      const horasCobrar = minutosTotales > 0 ? horasTotales + 1 : horasTotales;
      const monto = horasCobrar * config.tarifaHora;

      res.json({
        patente: row.patente,
        horaIngreso: fechaHoraIngreso.toLocaleTimeString(),
        horaEgreso: fechaHoraEgreso.toLocaleTimeString(),
        tiempoDentro: `${horasTotales}h ${minutosTotales}m`,
        monto
      });
    });
  });
});

// 🔹 Finalizar turno (Eliminar de autos)
router.delete('/egreso/:patente', (req, res) => {
  const { patente } = req.params;
  db.run('DELETE FROM autos WHERE patente = ?', [patente.toUpperCase()], function (err) {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ mensaje: 'Turno finalizado y auto retirado' });
  });
});

module.exports = router;
