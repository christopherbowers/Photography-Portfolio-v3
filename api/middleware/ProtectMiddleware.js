import asyncHandler from 'express-async-handler';
import jwt from 'jsonwebtoken';
import User from '../models/UserModel.js';

export const ProtectMiddleware = asyncHandler(async (req, res, next) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token) {
    res.status(401);
    throw new Error('Not authrize to access this route');
  }

  try {
    const { id, exp } = jwt.verify(token, process.env.JWT_SECRET_KEY);

    if (Date.now() >= exp * 1000) {
      res.status(401).end();
    }

    req.user = await User.findById(id);

    next();
  } catch (error) {
    res.status(401);
    throw new Error(error.message);
  }
});
