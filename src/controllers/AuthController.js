import asyncHandler from 'express-async-handler';
import User from '../models/UserModel.js';
import generateToken from '../utils/generateToken.js';
import bcrypt from 'bcryptjs';

const registerUser = asyncHandler(async (req, res) => {
  const user = await User.create(req.body);
  res.status(201).json({
    success: true,
    data: {
      fullName: user.fullName,
      username: user.username,
      email: user.email,
      token: generateToken(user._id),
    },
  });
});

const loginUser = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email: email });

  if (user) {
    const match = await bcrypt.compare(password, user.password);
    // Authenticate the user
    if (match) {
      req.session.loggedin = true;
      req.session.email = user.email;

      // Redirect to home page
      res.redirect('/admin');
      return;
    }
  }

  res.render('login', {
    layout: 'admin',
    email,
    password,
    error: 'Invalid username or password',
  });
};

const checkSession = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (!user) {
    res.status(401);
    throw new Error('User not found');
  } else {
    res.status(200).json({
      success: true,
      data: {
        id: user._id,
        fullName: user.fullName,
        email: user.email,
      },
    });
  }
});

export { registerUser, loginUser, checkSession };
