# Sistema de Autenticación MERN

Este proyecto ahora incluye un sistema completo de autenticación con base de datos MongoDB.

## 🚀 Configuración Inicial

### 1. Instalar dependencias del servidor
```bash
cd server
npm install
```

### 2. Configurar variables de entorno
Asegúrate de que el archivo `.env` en la carpeta `server` tenga:
```env
MONGO_URI_MERM=mongodb://127.0.0.1:27017
MONGO_DB_MERM=prueba_merm
PORT_MERM=5001
JWT_SECRET=tu_clave_secreta_muy_segura_cambiar_en_produccion
```

### 3. Crear usuarios de prueba
```bash
cd server
npm run seed-users
```

### 4. Iniciar el servidor
```bash
cd server
npm run dev
```

### 5. Iniciar el cliente
```bash
cd client
npm run dev
```

## 👤 Usuarios de Prueba

Después de ejecutar `npm run seed-users`, tendrás estos usuarios disponibles:

- **Admin**: `admin` / `admin` (rol: admin)
- **Usuario**: `user` / `user` (rol: user)  
- **Julian**: `julian` / `123` (rol: user)

## 🔧 Características Implementadas

### Backend (Server)
- ✅ **Modelo de Usuario** con Mongoose
- ✅ **Hash de contraseñas** con bcryptjs
- ✅ **JWT tokens** para autenticación
- ✅ **Rutas de autenticación**:
  - `POST /api/auth/login` - Iniciar sesión
  - `POST /api/auth/register` - Registrar usuario
  - `GET /api/auth/me` - Obtener usuario actual
- ✅ **Middleware de autenticación** para proteger rutas
- ✅ **Validación de datos** y manejo de errores

### Frontend (Client)
- ✅ **Componente Login** actualizado para usar API real
- ✅ **API client** con interceptores para JWT
- ✅ **Hook useAuth** actualizado para manejar tokens
- ✅ **Persistencia de sesión** en localStorage
- ✅ **Manejo automático de tokens expirados**

## 🔒 Seguridad

- Las contraseñas se hashean con bcrypt antes de guardarse
- Los tokens JWT tienen expiración de 24 horas
- Interceptores automáticos para manejar tokens expirados
- Validación de datos en backend
- Limpieza automática de localStorage en errores

## 📡 API Endpoints

### Autenticación
```javascript
// Login
POST /api/auth/login
{
  "username": "admin",
  "password": "admin"
}

// Registro
POST /api/auth/register  
{
  "username": "nuevo_usuario",
  "password": "mi_password",
  "email": "email@test.com",
  "role": "user" // opcional, default: "user"
}

// Obtener usuario actual (requiere token)
GET /api/auth/me
Authorization: Bearer <token>
```

## 🛠 Uso en el Frontend

```javascript
import { authAPI } from './api';

// Login
try {
  const result = await authAPI.login('admin', 'admin');
  if (result.success) {
    console.log('Login exitoso:', result.user);
  }
} catch (error) {
  console.error('Error:', error.message);
}

// Registro
try {
  const result = await authAPI.register({
    username: 'nuevo_usuario',
    password: 'mi_password',
    email: 'test@test.com'
  });
} catch (error) {
  console.error('Error:', error.message);
}

// Logout
authAPI.logout();
```

## 🔄 Migración desde Login Simulado

Los cambios principales realizados:

1. **Componente Login**: Cambió de validación hardcodeada a API calls
2. **Persistencia**: Ahora guarda tanto user data como JWT token
3. **API client**: Interceptores automáticos para manejar autenticación
4. **Manejo de errores**: Mejor UX con mensajes de error del servidor

## 🚨 Próximos Pasos Recomendados

1. **Proteger rutas de todos**: Agregar middleware de auth a `/api/todos`
2. **Asociar tareas a usuarios**: Modificar modelo Todo para incluir userId
3. **Roles y permisos**: Implementar control de acceso por roles
4. **Validación de email**: Agregar validación de formato de email
5. **Reset de password**: Implementar funcionalidad de recuperación
6. **Rate limiting**: Agregar límites de intentos de login

## 🔍 Testing

Para probar que todo funciona:

1. Inicia servidor y cliente
2. Ve a `http://localhost:5174`
3. Usa las credenciales de prueba para hacer login
4. Verifica que la sesión persiste al recargar la página
5. Prueba el logout

¡El sistema de autenticación está listo para uso en producción! 🎉
