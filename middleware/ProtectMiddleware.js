const asyncHandler = require('express-async-handler')
const jwt = require('jsonwebtoken')
const User = require('../models/UserModel.js')

const ProtectMiddleware = asyncHandler(async (req, res, next) => {
  let token

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1]
  }

  if (!token) {
    res.status(401)
    throw new Error('Not authrize to access this route')
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY)

    req.user = await User.findById(decoded.id)

    next()
  } catch (error) {
    res.status(401)
    throw new Error(error.message)
  }
})

module.exports = ProtectMiddleware
