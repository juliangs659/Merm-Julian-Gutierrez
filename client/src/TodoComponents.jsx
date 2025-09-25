import React from 'react';

/**
 * Componente para renderizar una tarea individual
 * Simplificado: eliminamos emojis y atributos innecesarios
 */
export function TodoItem({ todo, onToggle, onDelete }) {
  return (
    <li className="todo-item">
      {/* Checkbox para marcar/desmarcar como completada */}
      <input 
        type="checkbox" 
        checked={todo.done} 
        onChange={() => onToggle(todo)} // Pasar el objeto completo
        className="todo-checkbox"
      />
      {/* Texto de la tarea con estilo condicional */}
      <span className={`todo-text ${todo.done ? 'completed' : ''}`}>
        {todo.text}
      </span>
      {/* Botón de eliminar simplificado (antes tenía emoji 🗑️) */}
      <button onClick={() => onDelete(todo._id)} className="btn-delete">
        Eliminar
      </button>
    </li>
  );
}

/**
 * Componente contenedor que renderiza la lista completa de tareas
 * Recibe las tareas ya filtradas desde App.jsx
 */
export function TodoList({ todos, onToggle, onDelete }) {
  return (
    <ul className="todos-list">
      {/* Renderizar cada tarea usando TodoItem */}
      {todos.map(todo => (
        <TodoItem 
          key={todo._id}        // Key única para React
          todo={todo}           // Datos de la tarea
          onToggle={onToggle}   // Función para marcar/desmarcar
          onDelete={onDelete}   // Función para eliminar
        />
      ))}
    </ul>
  );
}
