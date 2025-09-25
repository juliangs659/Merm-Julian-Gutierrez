const mongoose = require('mongoose');

// Definición del esquema de "tareas" (todos)
const TodoSchema = new mongoose.Schema({
  text: { type: String, required: true },
  done: { type: Boolean, default: false }
}, { timestamps: true });

module.exports = mongoose.models.Todo || mongoose.model('Todo', TodoSchema);
