import axios from 'axios';

/**
 * Cliente HTTP simplificado para comunicarse con el backend
 * Configurado para usar el proxy de Vite (/api -> http://localhost:5000)
 */
const api = axios.create({ 
  baseURL: '/api' // Todas las peticiones van a /api/* gracias al proxy de Vite
});

// Interceptor para agregar el token JWT a todas las peticiones
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Interceptor para manejar respuestas con errores de autenticación
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Token expirado o inválido, limpiar localStorage
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      // Opcional: redirigir al login
      window.location.reload();
    }
    return Promise.reject(error);
  }
);

/**
 * Funciones de autenticación
 */
export const authAPI = {
  /**
   * Iniciar sesión
   */
  login: async (username, password) => {
    try {
      const response = await api.post('/auth/login', { username, password });
      
      if (response.data.success) {
        // Guardar token y datos del usuario
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('user', JSON.stringify(response.data.user));
      }
      
      return response.data;
    } catch (error) {
      throw error.response?.data || { success: false, message: 'Error de conexión' };
    }
  },

  /**
   * Registrar nuevo usuario
   */
  register: async (userData) => {
    try {
      const response = await api.post('/auth/register', userData);
      return response.data;
    } catch (error) {
      throw error.response?.data || { success: false, message: 'Error de conexión' };
    }
  },

  /**
   * Obtener información del usuario actual
   */
  getMe: async () => {
    try {
      const response = await api.get('/auth/me');
      return response.data;
    } catch (error) {
      throw error.response?.data || { success: false, message: 'Error de conexión' };
    }
  },

  /**
   * Cerrar sesión
   */
  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  }
};

export default api;
