import React, { useState } from 'react';
import { authAPI } from './api';

/**
 * Componente para el login con autenticación de base de datos
 */
export default function Login({ onLogin }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  /**
   * Maneja el envío del formulario de login
   * Ahora usa la API real para autenticación
   */
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // Llamar a la API de login
      const response = await authAPI.login(username.trim(), password);
      
      if (response.success) {
        // Login exitoso
        onLogin(response.user);
      } else {
        setError(response.message || 'Error en el login');
      }
    } catch (error) {
      console.error('Error en login:', error);
      setError(error.message || 'Error de conexión con el servidor');
    } finally {
      setLoading(false);
    }
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
