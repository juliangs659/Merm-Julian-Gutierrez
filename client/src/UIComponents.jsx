import React from 'react';

// Constantes de filtro duplicadas (también están en App.jsx)
// Podrían centralizarse, pero para simplicidad las mantenemos aquí
const FILTERS = {
  ALL: 'all',
  PENDING: 'pending', 
  COMPLETED: 'completed'
};

/**
 * Componente que renderiza los botones de filtro y estadísticas
 * Calcula las estadísticas internamente para simplificar App.jsx
 */
export function FilterButtons({ filter, onFilterChange, todos, onClearCompleted }) {
  // Calcular estadísticas de las tareas
  const total = todos.length;
  const completed = todos.filter(t => t.done).length;
  const pending = total - completed;

  return (
    <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem', flexWrap: 'wrap' }}>
      {/* Botón para mostrar todas las tareas */}
      <FilterButton
        active={filter === FILTERS.ALL}
        onClick={() => onFilterChange(FILTERS.ALL)}
        color="#667eea"
        backgroundColor="#f0f4ff"
      >
        Todas ({total})
      </FilterButton>
      
      {/* Botón para mostrar solo tareas pendientes */}
      <FilterButton
        active={filter === FILTERS.PENDING}
        onClick={() => onFilterChange(FILTERS.PENDING)}
        color="#f59e0b"
        backgroundColor="#fffbeb"
      >
        Pendientes ({pending})
      </FilterButton>
      
      {/* Botón para mostrar solo tareas completadas */}
      <FilterButton
        active={filter === FILTERS.COMPLETED}
        onClick={() => onFilterChange(FILTERS.COMPLETED)}
        color="#10b981"
        backgroundColor="#f0fdf4"
      >
        Completadas ({completed})
      </FilterButton>
      
      {/* Botón para limpiar todas las completadas - solo si hay alguna */}
      {completed > 0 && (
        <button 
          onClick={onClearCompleted}
          style={{
            padding: '0.5rem 1rem',
            border: '1px solid #ef4444',
            borderRadius: '8px',
            background: '#fef2f2',
            color: '#ef4444',
            cursor: 'pointer',
            fontSize: '0.875rem',
            marginLeft: 'auto'
          }}
        >
          Limpiar completadas
        </button>
      )}
    </div>
  );
}

/**
 * Componente auxiliar para renderizar botones de filtro individuales
 * Maneja el estilo visual según si está activo o no
 */
function FilterButton({ active, onClick, children, color, backgroundColor }) {
  return (
    <button 
      onClick={onClick}
      style={{
        padding: '0.5rem 1rem',
        // Borde más grueso y color personalizado si está activo
        border: active ? `2px solid ${color}` : '1px solid #e2e8f0',
        borderRadius: '8px',
        // Fondo personalizado si está activo, blanco si no
        background: active ? backgroundColor : 'white',
        cursor: 'pointer',
        fontSize: '0.875rem',
        transition: 'all 0.2s ease' // Animación suave
      }}
    >
      {children}
    </button>
  );
}

/**
 * Componente que muestra un estado vacío personalizado según el filtro activo
 * Mejora la experiencia de usuario cuando no hay tareas que mostrar
 */
export function EmptyState({ filter }) {
  /**
   * Función que retorna contenido apropiado según el filtro activo
   * Cada filtro tiene su propio mensaje motivacional
   */
  const getEmptyContent = () => {
    switch (filter) {
      case FILTERS.COMPLETED:
        return {
          icon: '🎉',
          title: 'No tienes tareas completadas',
          subtitle: ''
        };
      case FILTERS.PENDING:
        return {
          icon: '🎊',
          title: '¡Genial! No tienes tareas pendientes',
          subtitle: 'Disfruta tu tiempo libre'
        };
      default: // FILTERS.ALL o cualquier otro caso
        return {
          icon: '✨',
          title: 'No tienes tareas aún',
          subtitle: 'Agrega tu primera tarea para comenzar'
        };
    }
  };

  // Obtener el contenido apropiado según el filtro
  const { icon, title, subtitle } = getEmptyContent();

  return (
    <div className="empty-state">
      <div className="empty-icon">{icon}</div>
      <div className="empty-text">{title}</div>
      {/* Mostrar subtítulo solo si existe */}
      {subtitle && <div className="empty-subtext">{subtitle}</div>}
    </div>
  );
}
