const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcrypt');

const cartItemSchema = new mongoose.Schema({
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
  },
  qty: {
    type: Number,
    required: true,
  },
});

const addressSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'User must have a valid name'],
    trim: true,
  },
  mobile: {
    type: Number,
    required: [true, 'User must have a valid mobile number'],
    trim: true,
  },
  pin: {
    type: Number,
    required: [true, 'User must have a valid mobile number'],
    trim: true,
    minLength: 5,
  },
  address: {
    type: String,
    required: [true, 'User must have a valid name'],
    trim: true,
  },
  city: {
    type: String,
    required: [true, 'User must have a valid name'],
    trim: true,
  },
  state: {
    type: String,
    required: [true, 'User must have a valid name'],
    trim: true,
  },
});

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
    validate: [validator.isEmail, 'Please enter a valid email address'],
  },
  password: {
    type: String,
    required: [true, 'Please provide a password'],
    minLength: 8,
    select: false,
  },
  passwordConfirm: {
    type: String,
    required: [true, 'Please confirm your password'],
    validate: {
      validator: function (value) {
        return value === this.password;
      },
      message: 'Password are not the same',
    },
  },
  address: [addressSchema],
  cartItems: [cartItemSchema],
  wishList: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Product' }],
});

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  const salt = await bcrypt.genSalt(12);

  this.password = await bcrypt.hash(this.password, salt);

  this.passwordConfirm = undefined;

  next();
});

userSchema.methods.matchPassword = function (providedPassword, hashedPassword) {
  return bcrypt.compare(providedPassword, hashedPassword);
};

const User = mongoose.model('User', userSchema);

module.exports = User;
