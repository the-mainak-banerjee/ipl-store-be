const mongoose = require('mongoose');
const validator = require('validator');

const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, 'User must have a valid name'],
    trim: true,
  },
  email: {
    type: String,
    trim: true,
    required: [true, 'Please tell us your email address'],
    unique: true,
    lowercase: true,
    validate: [validator.email, 'Please enter a valid email address'],
  },
  password: {
    type: String,
    required: [true, 'Please provide a password'],
    minLength: 8,
    select: false,
  },
  passwordConfirma: {
    type: String,
    required: [true, 'Please confirm your password'],
    validate: {
      validator: function (value) {
        return value === this.password;
      },
      message: 'Password are not the same',
    },
  },
});

const User = userSchema.model('User', userSchema);

module.exports = User;
