import { useState, useEffect } from 'react';

/**
 * Hook personalizado para manejar la autenticación de usuarios
 * Maneja login, logout y persistencia en localStorage
 */
export function useAuth() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  /**
   * Verificar si hay una sesión guardada al cargar la app
   */
  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      try {
        const userData = JSON.parse(savedUser);
        setUser(userData);
      } catch (error) {
        // Si hay error al parsear, limpiar localStorage
        localStorage.removeItem('user');
      }
    }
    setLoading(false);
  }, []);

  /**
   * Función para hacer login
   * @param {Object} userData - Datos del usuario autenticado
   */
  const login = (userData) => {
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData));
  };

  /**
   * Función para hacer logout
   * Limpia el estado y localStorage
   */
  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  /**
   * Verificar si el usuario está autenticado
   * @returns {boolean} - true si está logueado
   */
  const isAuthenticated = () => {
    return user !== null;
  };

  /**
   * Verificar si el usuario es admin
   * @returns {boolean} - true si es admin
   */
  const isAdmin = () => {
    return user?.role === 'admin';
  };

  return {
    user,           // Datos del usuario actual
    loading,        // Estado de carga inicial
    login,          // Función para hacer login
    logout,         // Función para hacer logout
    isAuthenticated, // Función para verificar autenticación
    isAdmin         // Función para verificar si es admin
  };
}
