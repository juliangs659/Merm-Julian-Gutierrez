import React, { useState } from 'react';

/**
 * Componente de login sencillo
 * Por simplicidad, usa validación en el frontend (no recomendado para producción)
 */
export default function Login({ onLogin }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  /**
   * Maneja el envío del formulario de login
   * Validación simple: admin/admin o user/user
   */
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    // Simular un pequeño delay de autenticación
    setTimeout(() => {
      // Validación simple (en producción esto se haría en el backend)
      if (
        (username === 'admin' && password === 'admin') ||
        (username === 'user' && password === 'user') ||
        (username === 'julian' && password === '123')
      ) {
        // Login exitoso
        const userData = {
          username,
          role: username === 'admin' ? 'admin' : 'user',
          loginTime: new Date().toISOString()
        };
        
        // Guardar en localStorage para persistencia
        localStorage.setItem('user', JSON.stringify(userData));
        onLogin(userData);
      } else {
        setError('Usuario o contraseña incorrectos');
      }
      setLoading(false);
    }, 800); // Simular delay de red
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <header className="login-header">
          <h1 className="login-title">TaskFlow</h1>
          <p className="login-subtitle">Inicia sesión para continuar</p>
        </header>

        <form onSubmit={handleSubmit} className="login-form">
          {error && <div className="error-message">{error}</div>}
          
          <div className="form-group">
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Usuario"
              className="login-input"
              required
              disabled={loading}
            />
          </div>

          <div className="form-group">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Contraseña"
              className="login-input"
              required
              disabled={loading}
            />
          </div>

          <button 
            type="submit" 
            className="login-button"
            disabled={loading || !username.trim() || !password.trim()}
          >
            {loading ? 'Ingresando...' : 'Iniciar Sesión'}
          </button>
        </form>

        {/* Credenciales de prueba */}
        <div className="login-demo">
          <p><strong>Credenciales de prueba:</strong></p>
          <p>👤 admin / admin</p>
          <p>👤 user / user</p>
          <p>👤 julian / 123</p>
        </div>
      </div>
    </div>
  );
}
