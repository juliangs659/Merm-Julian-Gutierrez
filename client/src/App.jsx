import React, { useState } from 'react';
import { TodoList } from './TodoComponents';
import { FilterButtons, EmptyState } from './UIComponents';
import { useTodos } from './useTodos';
import { useAuth } from './useAuth';
import Login from './Login';
import { LoginDemo } from './LoginDemo';
import './App.css';

// Constantes para los tipos de filtro de tareas
// Movidas aquí para simplificar (antes estaban en config.js)
const FILTERS = {
  ALL: 'all',         // Mostrar todas las tareas
  PENDING: 'pending', // Solo tareas pendientes
  COMPLETED: 'completed' // Solo tareas completadas
};

/**
 * Componente principal de la aplicación TaskFlow
 * Maneja la interfaz de usuario, autenticación y coordina las operaciones de tareas
 */
export default function App() {
  // Hook de autenticación
  const { user, loading: authLoading, login, logout, isAuthenticated } = useAuth();
  
  // Estados locales para la UI (solo si está autenticado)
  const [text, setText] = useState(''); // Texto del input para nueva tarea
  const [filter, setFilter] = useState(FILTERS.ALL); // Filtro activo
  
  // Hook que maneja toda la lógica de tareas (solo si está autenticado)
  const {
    todos,              // Lista de tareas desde el servidor
    loading,            // Estado de carga
    error,              // Mensajes de error
    agregar,            // Función para agregar tarea
    alternar,           // Función para marcar/desmarcar
    eliminar,           // Función para eliminar tarea
    eliminarCompletadas // Función para limpiar completadas
  } = useTodos();

  /**
   * Maneja el envío del formulario para agregar nueva tarea
   * @param {Event} e - Evento del formulario
   */
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!text.trim()) return; // No agregar si está vacío
    
    const success = await agregar(text);
    if (success) {
      setText(''); // Limpiar input solo si se agregó correctamente
    }
  };

  /**
   * Filtrar tareas según el filtro seleccionado
   */
  const todosFiltradas = todos.filter(todo => {
    if (filter === FILTERS.PENDING) return !todo.done;   // Solo pendientes
    if (filter === FILTERS.COMPLETED) return todo.done;  // Solo completadas
    return true; // Todas (filtro por defecto)
  });

  // Mostrar loading mientras se verifica la autenticación
  if (authLoading) {
    return (
      <div className="loading">
        <div className="spinner"></div>
      </div>
    );
  }

  // Mostrar login si no está autenticado
  if (!isAuthenticated()) {
    return (
      <>
        <LoginDemo />
        <Login onLogin={login} />
      </>
    );
  }

  // Mostrar la aplicación principal si está autenticado
  return (
    <div className="app-container">
      {/* Header con información del usuario */}
      <div className="user-info">
        <span className="user-welcome">
          👋 Bienvenido, <strong>{user.username}</strong>
          {user.role === 'admin' && ' (Admin)'}
        </span>
        <button onClick={logout} className="logout-button">
          Cerrar Sesión
        </button>
      </div>

      {/* Header simplificado */}
      <header className="app-header">
        <h1 className="app-title">TaskFlow</h1>
        <p className="app-subtitle">Organiza tu día de manera eficiente</p>
      </header>

      {/* Mostrar errores de forma */}
      {error && <div className="error-message">{error}</div>}

      {/* Formulario para agregar tareas */}
      <form onSubmit={handleSubmit} className="todo-form">
        <input 
          value={text} 
          onChange={(e) => setText(e.target.value)}
          placeholder="¿Qué necesitas hacer hoy?"
          className="todo-input"
          maxLength={100} // Límite hardcodeado (antes venía de config)
        />
        <button type="submit" className="btn-primary">
          Agregar
        </button>
      </form>

      {/* Mostrar filtros solo si hay tareas */}
      {todos.length > 0 && (
        <FilterButtons
          filter={filter}
          onFilterChange={setFilter}
          todos={todos} // Pasamos las tareas para que calcule estadísticas
          onClearCompleted={eliminarCompletadas}
        />
      )}

      {/* Renderizado condicional: loading, estado vacío o lista de tareas */}
      {loading ? (
        <div className="loading">
          <div className="spinner"></div>
        </div>
      ) : todosFiltradas.length === 0 ? (
        // Mostrar mensaje apropiado cuando no hay tareas que mostrar
        <EmptyState filter={filter} />
      ) : (
        // Mostrar lista de tareas filtradas
        <TodoList 
          todos={todosFiltradas}
          onToggle={alternar}  // Función para marcar/desmarcar
          onDelete={eliminar}  // Función para eliminar
        />
      )}

    </div>
  );
}
