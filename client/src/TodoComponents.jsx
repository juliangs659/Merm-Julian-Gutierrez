import React from 'react';

export function TodoItem({ todo, onToggle, onDelete }) {
  return (
    <li className="todo-item">
      <input 
        type="checkbox" 
        checked={todo.done} 
        onChange={() => onToggle(todo)}
        className="todo-checkbox"
      />
      <span className={`todo-text ${todo.done ? 'completed' : ''}`}>
        {todo.text}
      </span>
      <button onClick={() => onDelete(todo._id)} className="btn-delete">
        Eliminar
      </button>
    </li>
  );
}

export function TodoList({ todos, onToggle, onDelete }) {
  return (
    <ul className="todos-list">
      {todos.map(todo => (
        <TodoItem 
          key={todo._id} 
          todo={todo} 
          onToggle={onToggle} 
          onDelete={onDelete} 
        />
      ))}
    </ul>
  );
}
