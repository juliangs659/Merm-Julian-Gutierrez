// server.js
require('dotenv').config();
const mongoose = require('mongoose');
const app = require('./app');

const { MONGO_URI_MERM, MONGO_DB_MERM, PORT_MERM = 5000 } = process.env;

// Usar variables de entorno
const MONGO_URI = MONGO_URI_MERM;
const DB_NAME   = MONGO_DB_MERM;

(async () => {
  try {
    // Bloquea por accidente URIs SRV de Atlas
    if (MONGO_URI.startsWith('mongodb+srv://')) {
      throw new Error('Usa mongodb://127.0.0.1:27017 para local, no mongodb+srv://');
    }

    console.log(`🔎 Conectando a ${MONGO_URI} (dbName=${DB_NAME})...`);
    await mongoose.connect(MONGO_URI, {
      dbName: DB_NAME,
      // Opcionales: timeouts más claros
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 20000,
    });

    console.log('✅ Conectado a MongoDB');
  } catch (err) {
    console.error('❌ Error conectando a MongoDB:', err.message);
  }

  app.listen(PORT_MERM, () => {
    console.log(`🚀 API escuchando en http://localhost:${PORT_MERM}`);
  });
})();
