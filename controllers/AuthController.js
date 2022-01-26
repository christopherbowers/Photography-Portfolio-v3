const asyncHandler = require('express-async-handler')
const User = require('../models/UserModel.js')
const generateToken = require('../utils/generateToken.js')
const bcrypt = require('bcrypt')

const registerUser = asyncHandler(async (req, res) => {
  const user = await User.create(req.body)
  res.status(201).json({
    success: true,
    data: {
      fullName: user.fullName,
      username: user.username,
      email: user.email,
      token: generateToken(user._id),
    },
  })
})

const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body

  let user = await User.findOne({ email: req.body.email })

  if (!user) {
    res.status(401)
    throw new Error('User not found')
  }

  const match = await bcrypt.compare(password, user.password)

  if (!match) {
    res.status(401)
    throw new Error('Password incorrect')
  }

  res.status(201).json({
    success: true,
    data: {
      id: user._id,
      fullName: user.fullName,
      username: user.username,
      email: user.email,
      token: generateToken(user._id),
    },
  })
})


const getMe = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id)

  if (!user) {
    res.status(401)
    throw new Error('User not found')
  } else {
    res.status(201).json({
      success: true,
      data: {
        id: user._id,
        fullName: user.fullName,
        email: user.email,
      },
    })
  }
})

module.exports = {
  registerUser,
  loginUser,
  getMe
}
