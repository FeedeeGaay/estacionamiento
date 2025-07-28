const sqlite3 = require('sqlite3').verbose();
const path = require('path');

// Ruta donde se guarda la base de datos
const dbPath = path.resolve(__dirname, 'estacionamiento.db');
const db = new sqlite3.Database(dbPath);

// Crear tablas si no existen
db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS autos (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      patente TEXT NOT NULL,
      fechaIngreso TEXT NOT NULL,
      horaIngreso TEXT NOT NULL
    )
  `);

  db.run(`
    CREATE TABLE IF NOT EXISTS configuracion (
      id INTEGER PRIMARY KEY CHECK (id = 1),
      tarifaHora REAL NOT NULL
    )
  `);

  // Insertar valor inicial de tarifa si no existe
  db.get("SELECT tarifaHora FROM configuracion WHERE id = 1", (err, row) => {
    if (!row) {
      db.run("INSERT INTO configuracion (id, tarifaHora) VALUES (1, 500)");
    }
  });
});

module.exports = db;
