import { useState, useEffect } from 'react';
import api from './api';

export function useTodos() {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const cargar = async () => {
    try {
      setLoading(true);
      setError('');
      const { data } = await api.get('/todos');
      setTodos(data);
    } catch (err) {
      setError('Error al cargar las tareas');
    } finally {
      setLoading(false);
    }
  };

  const agregar = async (text) => {
    if (!text.trim()) return false;
    
    try {
      setError('');
      await api.post('/todos', { text: text.trim() });
      await cargar(); // Recargar la lista
      return true;
    } catch (err) {
      setError('Error al agregar la tarea');
      return false;
    }
  };

  const alternar = async (todo) => {
    try {
      await api.patch(`/todos/${todo._id}`, { done: !todo.done });
      await cargar();
      return true;
    } catch (err) {
      setError('Error al actualizar la tarea');
      return false;
    }
  };

  const eliminar = async (id) => {
    try {
      await api.delete(`/todos/${id}`);
      await cargar();
      return true;
    } catch (err) {
      setError('Error al eliminar la tarea');
      return false;
    }
  };

  const eliminarCompletadas = async () => {
    const completadas = todos.filter(t => t.done);
    for (const todo of completadas) {
      await eliminar(todo._id);
    }
  };

  useEffect(() => {
    cargar();
  }, []);

  return {
    todos,
    loading,
    error,
    agregar,
    alternar,
    eliminar,
    eliminarCompletadas
  };
}
