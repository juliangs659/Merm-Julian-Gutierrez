import React from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'

/**
 * Punto de entrada de la aplicación React
 * Usa la nueva API createRoot de React 18 para renderizar la app
 * Monta el componente App en el elemento con id='root' del HTML
 */
createRoot(document.getElementById('root')).render(<App />)
