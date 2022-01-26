const express = require('express')

const {
  registerUser,
  loginUser,
  getMe,
} = require('../controllers/AuthController.js')

const ProtectMiddleware = require('../middleware/ProtectMiddleware.js')
const authRouter = require('express').Router();

authRouter.route('/register').post(registerUser)
authRouter.route('/login').post(loginUser)
authRouter.route('/getMe').get(ProtectMiddleware, getMe)

module.exports = authRouter;

