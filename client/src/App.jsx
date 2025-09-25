import React, { useState } from 'react';
import { TodoList } from './TodoComponents';
import { FilterButtons, EmptyState } from './UIComponents';
import { useTodos } from './useTodos';
import './App.css';

const FILTERS = {
  ALL: 'all',
  PENDING: 'pending',
  COMPLETED: 'completed'
};

export default function App() {
  const [text, setText] = useState('');
  const [filter, setFilter] = useState(FILTERS.ALL);
  
  const {
    todos,
    loading,
    error,
    agregar,
    alternar,
    eliminar,
    eliminarCompletadas
  } = useTodos();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!text.trim()) return;
    
    const success = await agregar(text);
    if (success) {
      setText('');
    }
  };

  // Filtrar tareas
  const todosFiltradas = todos.filter(todo => {
    if (filter === FILTERS.PENDING) return !todo.done;
    if (filter === FILTERS.COMPLETED) return todo.done;
    return true;
  });

  return (
    <div className="app-container">
      <header className="app-header">
        <h1 className="app-title">Merm Julian Gutierrez</h1>
        <p className="app-subtitle">Organiza tu día de manera eficiente</p>
        

      </header>

      {error && <div className="error-message">{error}</div>}

      <form onSubmit={handleSubmit} className="todo-form">
        <input 
          value={text} 
          onChange={(e) => setText(e.target.value)}
          placeholder="¿Qué necesitas hacer hoy?"
          className="todo-input"
          maxLength={100}
        />
        <button type="submit" className="btn-primary">
          Agregar
        </button>
      </form>

      {todos.length > 0 && (
        <FilterButtons
          filter={filter}
          onFilterChange={setFilter}
          todos={todos}
          onClearCompleted={eliminarCompletadas}
        />
      )}

      {loading ? (
        <div className="loading">
          <div className="spinner"></div>
        </div>
      ) : todosFiltradas.length === 0 ? (
        <EmptyState filter={filter} />
      ) : (
        <TodoList 
          todos={todosFiltradas}
          onToggle={alternar}
          onDelete={eliminar}
        />
      )}


    </div>
  );
}
