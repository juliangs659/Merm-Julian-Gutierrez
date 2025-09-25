Frontend (client)
-----------------

# TaskFlow - Gestor de Tareas MERN

Una aplicación moderna y elegante para gestionar tus tareas diarias, construida con el stack MERN (MongoDB, Express, React, Node.js).

## ✨ Características

- 🎨 **Interfaz moderna**: Diseño elegante con gradientes y animaciones suaves
- 📱 **Responsive**: Funciona perfectamente en dispositivos móviles y desktop
- ⚡ **Real-time**: Actualizaciones instantáneas con el servidor
- 🔍 **Filtros**: Vista de todas las tareas, pendientes o completadas
- 📊 **Estadísticas**: Contador de tareas totales, pendientes y completadas
- 🌐 **Conectividad**: Indicador de estado de conexión con el servidor
- ♿ **Accesible**: Diseño inclusivo con buenas prácticas de accesibilidad

## 🚀 Tecnologías Utilizadas

### Frontend
- **React 18** - Biblioteca de UI moderna con Hooks
- **Vite** - Build tool rápida y eficiente
- **Axios** - Cliente HTTP para comunicación con la API
- **CSS3** - Estilos modernos con flexbox y grid
- **Google Fonts** - Tipografía Inter para mejor legibilidad

### Backend (separado)
- **Node.js** - Entorno de ejecución JavaScript
- **Express** - Framework web minimalista
- **MongoDB** - Base de datos NoSQL
- **Mongoose** - ODM para MongoDB

## 📦 Instalación y Uso

1. **Clona el repositorio**
   ```bash
   git clone <tu-repositorio>
   cd mern-mini-es/client
   ```

2. **Instala las dependencias**
   ```bash
   npm install
   ```

3. **Asegúrate de que el backend esté corriendo**
   - El servidor debe estar ejecutándose en `http://localhost:5000`
   - Debe tener las rutas `/api/todos` configuradas

4. **Inicia el servidor de desarrollo**
   ```bash
   npm run dev
   ```

5. **Abre tu navegador**
   - Ve a `http://localhost:5173`
   - ¡Comienza a gestionar tus tareas!

## 🏗️ Estructura del Proyecto

```
src/
├── App.jsx          # Componente principal
├── App.css          # Estilos principales
├── api.js           # Configuración de Axios y funciones de API
├── config.js        # Configuración y constantes de la aplicación
├── useTodos.js      # Hook personalizado para manejo de tareas
├── TodoComponents.jsx    # Componentes relacionados con tareas
├── UIComponents.jsx      # Componentes de interfaz (filtros, stats, etc.)
└── main.jsx         # Punto de entrada de React
```

## 🎯 Funcionalidades

### Gestión de Tareas
- ➕ **Agregar tareas**: Escribe tu tarea y presiona "Agregar"
- ✅ **Marcar como completada**: Haz clic en el checkbox
- 🗑️ **Eliminar tareas**: Botón de eliminar en cada tarea
- 🧹 **Limpiar completadas**: Elimina todas las tareas completadas de una vez

### Filtros y Visualización
- 📋 **Ver todas**: Muestra todas las tareas
- ⏳ **Ver pendientes**: Solo tareas sin completar
- ✅ **Ver completadas**: Solo tareas completadas
- 📊 **Estadísticas**: Contadores en tiempo real

### Experiencia de Usuario
- 🔄 **Actualizaciones automáticas**: Los cambios se reflejan inmediatamente
- 🌐 **Estado de conexión**: Indicador visual del estado del servidor
- 📱 **Diseño responsive**: Se adapta a cualquier tamaño de pantalla
- ✨ **Animaciones suaves**: Transiciones y efectos visuales agradables

## 🔧 Configuración

### Proxy de Vite
El proyecto usa un proxy para redirigir las peticiones `/api` al backend:

```javascript
// vite.config.js
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': 'http://localhost:5000'
    }
  }
})
```

### Variables de Configuración
Puedes modificar la configuración en `src/config.js`:

```javascript
export const APP_CONFIG = {
  name: 'TaskFlow',
  version: '1.0.0',
  maxTodoLength: 100,
  api: {
    timeout: 10000,
    retries: 3
  }
};
```

## 📝 Scripts Disponibles

- `npm run dev` - Inicia el servidor de desarrollo
- `npm run build` - Construye la aplicación para producción
- `npm run preview` - Vista previa de la build de producción

## 🔗 API Endpoints

La aplicación se comunica con estos endpoints del backend:

- `GET /api/todos` - Obtener todas las tareas
- `POST /api/todos` - Crear nueva tarea
- `PATCH /api/todos/:id` - Actualizar tarea existente
- `DELETE /api/todos/:id` - Eliminar tarea
- `GET /api/health` - Verificar estado del servidor

## 🎨 Personalización

### Colores
Los colores principales se pueden modificar en `App.css`:
- **Primario**: `#667eea` (azul)
- **Secundario**: `#764ba2` (púrpura)
- **Éxito**: `#10b981` (verde)
- **Error**: `#ef4444` (rojo)

### Fuentes
Usa la fuente Inter de Google Fonts. Puedes cambiarla en `index.html`.

## 🤝 Contribución

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Ve el archivo `LICENSE` para más detalles.

## 🙏 Créditos

- **Iconos**: Emojis nativos del sistema
- **Fuentes**: [Inter](https://fonts.google.com/specimen/Inter) de Google Fonts
- **Inspiración**: Aplicaciones modernas de gestión de tareas

---

Hecho con ❤️ y React

🚀 Pasos rápidos:

1. Instalar dependencias:
   npm install

2. Correr en desarrollo:
   npm run dev

ℹ️ Notas:
- vite.config.js define un proxy para que /api vaya a http://localhost:5000 y así no haya problemas de CORS.
- api.js usa axios apuntando a /api.
