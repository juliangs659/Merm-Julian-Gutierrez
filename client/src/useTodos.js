import { useState, useEffect } from 'react';
import api from './api';

/**
 * Hook personalizado para manejar el estado y operaciones de las tareas
 * Centraliza toda la lógica de comunicación con la API
 */
export function useTodos() {
  // Estados principales de la aplicación
  const [todos, setTodos] = useState([]); // Lista de tareas
  const [loading, setLoading] = useState(true); // Estado de carga
  const [error, setError] = useState(''); // Mensajes de error

  /**
   * Función para cargar todas las tareas desde el servidor
   */
  const cargar = async () => {
    try {
      setLoading(true);
      setError(''); // Limpiar errores previos
      const { data } = await api.get('/todos');
      setTodos(data); // Actualizar la lista de tareas
    } catch (err) {
      setError('Error al cargar las tareas');
    } finally {
      setLoading(false); // Siempre desactivar el loading
    }
  };

  /**
   * Función para agregar una nueva tarea
   * @param {string} text - Texto de la tarea a agregar
   * @returns {boolean} - true si se agregó correctamente, false si hubo error
   */
  const agregar = async (text) => {
    if (!text.trim()) return false; // Validar que el texto no esté vacío
    
    try {
      setError('');
      await api.post('/todos', { text: text.trim() });
      await cargar(); // Recargar la lista para mostrar la nueva tarea
      return true;
    } catch (err) {
      setError('Error al agregar la tarea');
      return false;
    }
  };

  /**
   * Función para alternar el estado de completado de una tarea
   * @param {Object} todo - Objeto de la tarea a modificar
   * @returns {boolean} - true si se actualizó correctamente
   */
  const alternar = async (todo) => {
    try {
      // Enviar el estado opuesto al actual
      await api.patch(`/todos/${todo._id}`, { done: !todo.done });
      await cargar(); // Recargar para mostrar el cambio
      return true;
    } catch (err) {
      setError('Error al actualizar la tarea');
      return false;
    }
  };

  /**
   * Función para eliminar una tarea específica
   * @param {string} id - ID de la tarea a eliminar
   * @returns {boolean} - true si se eliminó correctamente
   */
  const eliminar = async (id) => {
    try {
      await api.delete(`/todos/${id}`);
      await cargar(); // Recargar para actualizar la lista
      return true;
    } catch (err) {
      setError('Error al eliminar la tarea');
      return false;
    }
  };

  /**
   * Función para eliminar todas las tareas completadas
   * Itera sobre las tareas marcadas como completadas y las elimina una por una
   */
  const eliminarCompletadas = async () => {
    const completadas = todos.filter(t => t.done); // Filtrar solo las completadas
    for (const todo of completadas) {
      await eliminar(todo._id); // Eliminar cada una
    }
  };

  // Efecto para cargar las tareas al montar el componente
  useEffect(() => {
    cargar(); // Cargar tareas inicial
  }, []);

  // Retornar el estado y funciones que necesita el componente
  return {
    todos,              // Lista de tareas
    loading,            // Estado de carga
    error,              // Mensaje de error si existe
    agregar,            // Función para agregar tarea
    alternar,           // Función para marcar/desmarcar tarea
    eliminar,           // Función para eliminar tarea
    eliminarCompletadas // Función para limpiar completadas
  };
}
