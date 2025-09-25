MERN-mini (proyecto completo)
-----------------------------

📌 ¿Qué es?
Un ejemplo educativo de stack MERN (Mongo, Express, React, Node) para entender cómo conectar fácilmente frontend ↔ backend.

La app es una **lista de tareas (To-Do)**:
- Crear tarea
- Listar tareas
- Marcar como hecha
- Eliminar tarea

📂 Estructura:
- /server → backend con Express y Mongoose
- /client → frontend con React + Vite

🚀 Cómo correrlo:
1) Servidor:
   cd server
   cp .env.example .env   # configurar MONGO_URI si tienes Mongo
   npm install
   npm run dev

2) Cliente:
   cd client
   npm install
   npm run dev

✅ Conexión frontend ↔ backend:
- El cliente llama a /api/... (ruta relativa)
- Vite redirige esas peticiones al backend en localhost:5000
- Express procesa la petición y habla con Mongo
- Devuelve JSON al cliente React

🧪 Pruebas:
- En /server/tests hay pruebas con Jest + Supertest (ejemplo: health.test.js)
- Para correrlas:
  cd server
  npm test
