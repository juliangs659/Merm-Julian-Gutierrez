const express = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const router = express.Router();

// Clave secreta para JWT desde variables de entorno
const JWT_SECRET = process.env.JWT_SECRET || 'tu_clave_secreta_muy_segura';

/**
 * POST /api/auth/login
 * Endpoint para iniciar sesión
 */
router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;

    // Validar que se proporcionen username y password
    if (!username || !password) {
      return res.status(400).json({ 
        success: false, 
        message: 'Usuario y contraseña son requeridos' 
      });
    }

    // Buscar el usuario en la base de datos
    const user = await User.findOne({ username: username.trim() });
    
    if (!user) {
      return res.status(401).json({ 
        success: false, 
        message: 'Usuario o contraseña incorrectos' 
      });
    }

    // Verificar la contraseña
    const isPasswordValid = await user.comparePassword(password);
    
    if (!isPasswordValid) {
      return res.status(401).json({ 
        success: false, 
        message: 'Usuario o contraseña incorrectos' 
      });
    }

    // Generar token JWT
    const token = jwt.sign(
      { 
        userId: user._id, 
        username: user.username, 
        role: user.role 
      },
      JWT_SECRET,
      { expiresIn: '24h' }
    );

    // Respuesta exitosa con datos del usuario y token
    res.json({
      success: true,
      message: 'Login exitoso',
      user: {
        id: user._id,
        username: user.username,
        role: user.role,
        email: user.email,
        loginTime: new Date().toISOString()
      },
      token
    });

  } catch (error) {
    console.error('Error en login:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Error interno del servidor' 
    });
  }
});

/**
 * POST /api/auth/register
 * Endpoint para registrar nuevos usuarios
 */
router.post('/register', async (req, res) => {
  try {
    const { username, password, email, role } = req.body;

    // Validar campos requeridos
    if (!username || !password) {
      return res.status(400).json({ 
        success: false, 
        message: 'Usuario y contraseña son requeridos' 
      });
    }

    // Verificar si el usuario ya existe
    const existingUser = await User.findOne({ username: username.trim() });
    
    if (existingUser) {
      return res.status(409).json({ 
        success: false, 
        message: 'El usuario ya existe' 
      });
    }

    // Crear nuevo usuario
    const newUser = new User({
      username: username.trim(),
      password,
      email: email?.trim(),
      role: role || 'user'
    });

    await newUser.save();

    // Respuesta exitosa
    res.status(201).json({
      success: true,
      message: 'Usuario creado exitosamente',
      user: {
        id: newUser._id,
        username: newUser.username,
        role: newUser.role,
        email: newUser.email
      }
    });

  } catch (error) {
    console.error('Error en registro:', error);
    
    // Manejar errores de validación de MongoDB
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map(err => err.message);
      return res.status(400).json({ 
        success: false, 
        message: messages.join(', ') 
      });
    }

    // Error de clave duplicada
    if (error.code === 11000) {
      return res.status(409).json({ 
        success: false, 
        message: 'El usuario ya existe' 
      });
    }

    res.status(500).json({ 
      success: false, 
      message: 'Error interno del servidor' 
    });
  }
});

/**
 * GET /api/auth/me
 * Endpoint para obtener información del usuario autenticado
 */
router.get('/me', authenticateToken, async (req, res) => {
  try {
    const user = await User.findById(req.user.userId);
    
    if (!user) {
      return res.status(404).json({ 
        success: false, 
        message: 'Usuario no encontrado' 
      });
    }

    res.json({
      success: true,
      user: {
        id: user._id,
        username: user.username,
        role: user.role,
        email: user.email
      }
    });

  } catch (error) {
    console.error('Error obteniendo usuario:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Error interno del servidor' 
    });
  }
});

/**
 * Middleware para autenticar token JWT
 */
function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // Bearer TOKEN

  if (!token) {
    return res.status(401).json({ 
      success: false, 
      message: 'Token de acceso requerido' 
    });
  }

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ 
        success: false, 
        message: 'Token inválido' 
      });
    }
    
    req.user = user;
    next();
  });
}

module.exports = router;
