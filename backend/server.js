const express = require('express');
const cors = require('cors');
const autosRoutes = require('./routes/autos');
const configRoutes = require('./routes/config');

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

// Rutas
app.use('/', autosRoutes);
app.use('/', configRoutes);

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
});
