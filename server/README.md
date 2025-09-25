Backend (server)
----------------

Este es el servidor Express + Mongo para la app MERN-mini.

🚀 Pasos rápidos:

1. Copiar `.env.example` a `.env` y ajustar el valor de MONGO_URI:
   cp .env.example .env

2. Instalar dependencias:
   npm install

3. Correr en desarrollo (con autoreload gracias a nodemon):
   npm run dev

4. Ejecutar pruebas con Jest + Supertest:
   npm test

ℹ️ Notas:
- Si no configuras MONGO_URI, el servidor arranca pero no podrá guardar en base de datos.
- Las rutas están bajo el prefijo /api (ejemplo: GET /api/todos).
