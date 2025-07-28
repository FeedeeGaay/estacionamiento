const express = require('express');
const router = express.Router();
const db = require('../database/db');

// Obtener tarifa
router.get('/tarifa', (req, res) => {
  db.get("SELECT tarifaHora FROM configuracion WHERE id = 1", (err, row) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ tarifaHora: row.tarifaHora });
  });
});

// Actualizar tarifa
router.put('/tarifa', (req, res) => {
  const { tarifaHora } = req.body;
  if (tarifaHora <= 0) return res.status(400).json({ error: "Tarifa inválida" });

  db.run("UPDATE configuracion SET tarifaHora = ? WHERE id = 1", [tarifaHora], function(err) {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ mensaje: "Tarifa actualizada correctamente" });
  });
});

module.exports = router;
