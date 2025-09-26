const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

// Definición del esquema de "usuarios"
const UserSchema = new mongoose.Schema({
  username: { 
    type: String, 
    required: true, 
    unique: true,
    trim: true,
    minlength: 3,
    maxlength: 30
  },
  password: { 
    type: String, 
    required: true,
    minlength: 3
  },
  role: { 
    type: String, 
    enum: ['admin', 'user'], 
    default: 'user' 
  },
  email: {
    type: String,
    required: false,
    trim: true,
    lowercase: true
  }
}, { 
  timestamps: true 
});

// Middleware para hashear la contraseña antes de guardar
UserSchema.pre('save', async function(next) {
  // Solo hashear si la contraseña ha sido modificada
  if (!this.isModified('password')) return next();
  
  try {
    // Hashear la contraseña con salt de 10 rounds
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

// Método para comparar contraseñas
UserSchema.methods.comparePassword = async function(candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

// Método para obtener los datos del usuario sin la contraseña
UserSchema.methods.toJSON = function() {
  const user = this.toObject();
  delete user.password;
  return user;
};

module.exports = mongoose.models.User || mongoose.model('User', UserSchema);
