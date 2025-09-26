const express = require('express');
const cors = require('cors');
const todoRoutes = require('./routes/todoRoutes');
const authRoutes = require('./routes/authRoutes');

const app = express();

app.use(express.json());
app.use(cors());

// Endpoint de prueba para saber si el servidor está vivo
app.get('/api/health', (_req, res) => res.json({ ok: true }));

// Montamos las rutas de autenticación
app.use('/api/auth', authRoutes);

// Montamos las rutas principales de tareas
app.use('/api/todos', todoRoutes);

module.exports = app;
