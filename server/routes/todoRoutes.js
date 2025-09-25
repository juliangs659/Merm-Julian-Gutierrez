  const express = require('express');
  const router = express.Router();
  const Todo = require('../models/Todo');

  // Listar todas las tareas
  router.get('/', async (_req, res) => {
    try {
      const todos = await Todo.find().sort({ createdAt: -1 });
      res.json(todos);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });

  // Crear nueva tarea
  router.post('/', async (req, res) => {
    try {
      const { text } = req.body;
      if (!text) return res.status(400).json({ error: 'El campo text es requerido' });
      const created = await Todo.create({ text });
      res.status(201).json(created);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });

  // Actualizar tarea (por id)
  router.patch('/:id', async (req, res) => {
    try {
      const { id } = req.params;
      const updated = await Todo.findByIdAndUpdate(id, req.body, { new: true });
      res.json(updated);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });

  // Eliminar tarea (por id)
  router.delete('/:id', async (req, res) => {
    try {
      const { id } = req.params;
      await Todo.findByIdAndDelete(id);
      res.status(204).end();
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });

  module.exports = router;
