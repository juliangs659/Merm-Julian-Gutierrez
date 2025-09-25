import React from 'react';

const FILTERS = {
  ALL: 'all',
  PENDING: 'pending',
  COMPLETED: 'completed'
};

export function FilterButtons({ filter, onFilterChange, todos, onClearCompleted }) {
  const total = todos.length;
  const completed = todos.filter(t => t.done).length;
  const pending = total - completed;

  return (
    <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem', flexWrap: 'wrap' }}>
      <FilterButton
        active={filter === FILTERS.ALL}
        onClick={() => onFilterChange(FILTERS.ALL)}
        color="#667eea"
        backgroundColor="#f0f4ff"
      >
        Todas ({total})
      </FilterButton>
      
      <FilterButton
        active={filter === FILTERS.PENDING}
        onClick={() => onFilterChange(FILTERS.PENDING)}
        color="#f59e0b"
        backgroundColor="#fffbeb"
      >
        Pendientes ({pending})
      </FilterButton>
      
      <FilterButton
        active={filter === FILTERS.COMPLETED}
        onClick={() => onFilterChange(FILTERS.COMPLETED)}
        color="#10b981"
        backgroundColor="#f0fdf4"
      >
        Completadas ({completed})
      </FilterButton>
      
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

function FilterButton({ active, onClick, children, color, backgroundColor }) {
  return (
    <button 
      onClick={onClick}
      style={{
        padding: '0.5rem 1rem',
        border: active ? `2px solid ${color}` : '1px solid #e2e8f0',
        borderRadius: '8px',
        background: active ? backgroundColor : 'white',
        cursor: 'pointer',
        fontSize: '0.875rem',
        transition: 'all 0.2s ease'
      }}
    >
      {children}
    </button>
  );
}

export function EmptyState({ filter }) {
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
      default:
        return {
          icon: '✨',
          title: 'No tienes tareas aún',
          subtitle: 'Agrega tu primera tarea para comenzar'
        };
    }
  };

  const { icon, title, subtitle } = getEmptyContent();

  return (
    <div className="empty-state">
      <div className="empty-icon">{icon}</div>
      <div className="empty-text">{title}</div>
      {subtitle && <div className="empty-subtext">{subtitle}</div>}
    </div>
  );
}
