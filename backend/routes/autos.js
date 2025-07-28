const express = require('express');
const router = express.Router();
const db = require('../database/db');

// 🔹 Ingreso de auto
router.post('/ingreso', (req, res) => {
  const { patente } = req.body;
  if (!patente) return res.status(400).json({ error: 'Patente requerida' });

  const fecha = new Date();
  const fechaIngreso = fecha.toLocaleDateString();
  const horaIngreso = fecha.toLocaleTimeString();

  db.run(
    'INSERT INTO autos (patente, fechaIngreso, horaIngreso) VALUES (?, ?, ?)',
    [patente.toUpperCase(), fechaIngreso, horaIngreso],
    function (err) {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ mensaje: 'Auto ingresado correctamente', id: this.lastID });
    }
  );
});

// 🔹 Listar autos dentro
router.get('/autos', (req, res) => {
  db.all('SELECT * FROM autos', [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

// 🔹 Consultar auto para egreso (usa tarifa configurada)
router.get('/egreso/:patente', (req, res) => {
  const { patente } = req.params;

  db.get('SELECT * FROM autos WHERE patente = ?', [patente.toUpperCase()], (err, row) => {
    if (err) return res.status(500).json({ error: err.message });
    if (!row) return res.status(404).json({ error: 'Auto no encontrado' });

    db.get("SELECT tarifaHora FROM configuracion WHERE id = 1", (err, config) => {
      if (err) return res.status(500).json({ error: err.message });

      const horaIngreso = new Date(`${row.fechaIngreso} ${row.horaIngreso}`);
      const horaActual = new Date();

      const tiempoMs = horaActual - horaIngreso;
      const horas = Math.ceil(tiempoMs / (1000 * 60 * 60));
      const monto = horas * config.tarifaHora;

      res.json({
        patente: row.patente,
        fechaIngreso: row.fechaIngreso,
        horaIngreso: row.horaIngreso,
        tiempo: `${horas} hora(s)`,
        monto
      });
    });
  });
});

// 🔹 Finalizar turno (eliminar auto)
router.delete('/egreso/:patente', (req, res) => {
  const { patente } = req.params;
  db.run('DELETE FROM autos WHERE patente = ?', [patente.toUpperCase()], function (err) {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ mensaje: 'Turno finalizado y auto retirado' });
  });
});

module.exports = router;
