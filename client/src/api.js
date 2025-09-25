import axios from 'axios';

/**
 * Cliente HTTP simplificado para comunicarse con el backend
 * Configurado para usar el proxy de Vite (/api -> http://localhost:5000)
 */
const api = axios.create({ 
  baseURL: '/api' // Todas las peticiones van a /api/* gracias al proxy de Vite
});

export default api;
