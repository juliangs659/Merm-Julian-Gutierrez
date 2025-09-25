import React from 'react';

/**
 * Componente que muestra información sobre las credenciales de prueba
 * Solo para demostración - no usar en producción
 */
export function LoginDemo() {
  return (
    <div style={{
      position: 'fixed',
      top: '20px',
      right: '20px',
      background: 'rgba(255, 255, 255, 0.95)',
      backdrop: 'blur(10px)',
      padding: '1rem',
      borderRadius: '12px',
      boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)',
      fontSize: '0.875rem',
      maxWidth: '200px',
      zIndex: 1000
    }}>
      <h4 style={{ margin: '0 0 0.5rem 0', color: '#374151' }}>
        🔐 Credenciales de Prueba
      </h4>
      <div style={{ color: '#64748b' }}>
        <p style={{ margin: '0.25rem 0' }}>👤 admin / admin</p>
        <p style={{ margin: '0.25rem 0' }}>👤 user / user</p>
        <p style={{ margin: '0.25rem 0' }}>👤 julian / 123</p>
      </div>
    </div>
  );
}
