const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

const signInWithtoken = (id) =>
  jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });

exports.signup = async (req, res, next) => {
  try {
    const newUser = await User.create(req.body);

    const token = signInWithtoken(newUser.id);

    res.status(201).json({
      status: 'success',
      token,
      data: {
        newUser,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err,
    });
  }
};

exports.login = async (req, res, next) => {
  // 1) Check if email and password are there
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      status: 'fail',
      message: 'Please enter a valid email and password',
    });
  }

  // 2) Check if user is exist with the email and the password is matching.
  const user = await User.findOne({ email }).select('+password');
  const isPasswordMatching = user
    ? await user.matchPassword(password, user.password)
    : false;

  if (!user || !isPasswordMatching) {
    return res.status(400).json({
      status: 'fail',
      message: 'Either email or password is not matching',
    });
  }

  // 3) Create a JWT token and sign in
  const token = signInWithtoken(user.id);
  res.status(200).json({
    status: 'success',
    data: {
      token,
    },
  });
};
