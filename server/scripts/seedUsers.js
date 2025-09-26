/**
 * Script para crear usuarios de prueba en la base de datos
 * Ejecutar con: node scripts/seedUsers.js
 */

require('dotenv').config();
const mongoose = require('mongoose');
const User = require('../models/User');

// Variables de entorno
const { MONGO_URI_MERM, MONGO_DB_MERM } = process.env;

const MONGO_URI = MONGO_URI_MERM;
const DB_NAME = MONGO_DB_MERM;

// Usuarios de prueba
const testUsers = [
  {
    username: 'admin',
    password: 'admin',
    role: 'admin',
    email: 'admin@test.com'
  },
  {
    username: 'user', 
    password: 'user',
    role: 'user',
    email: 'user@test.com'
  },
  {
    username: 'julian',
    password: '123',
    role: 'user',
    email: 'julian@test.com'
  }
];

async function seedUsers() {
  try {
    console.log(`🔎 Conectando a ${MONGO_URI} (dbName=${DB_NAME})...`);
    
    await mongoose.connect(MONGO_URI, {
      dbName: DB_NAME,
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 20000,
    });

    console.log('✅ Conectado a MongoDB');

    // Limpiar usuarios existentes (opcional)
    console.log('🧹 Limpiando usuarios existentes...');
    await User.deleteMany({});

    // Crear usuarios de prueba
    console.log('👥 Creando usuarios de prueba...');
    
    for (const userData of testUsers) {
      try {
        const user = new User(userData);
        await user.save();
        console.log(`✅ Usuario creado: ${userData.username} (${userData.role})`);
      } catch (error) {
        console.error(`❌ Error creando usuario ${userData.username}:`, error.message);
      }
    }

    console.log('\n🎉 Usuarios de prueba creados exitosamente!');
    console.log('\nCredenciales disponibles:');
    testUsers.forEach(user => {
      console.log(`👤 ${user.username} / ${user.password} (${user.role})`);
    });

  } catch (error) {
    console.error('❌ Error:', error.message);
  } finally {
    await mongoose.connection.close();
    console.log('\n🔌 Conexión cerrada');
    process.exit(0);
  }
}

// Ejecutar el script
seedUsers();
