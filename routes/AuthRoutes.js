const express = require('express')

const {
  registerUser,
  loginUser,
  checkSession,
} = require('../controllers/AuthController.js')

const ProtectMiddleware = require('../middleware/ProtectMiddleware.js')
const authRouter = require('express').Router();

authRouter.route('/register').post(registerUser)
authRouter.route('/login').post(loginUser)
authRouter.route('/session').get(ProtectMiddleware, checkSession)

module.exports = authRouter;

