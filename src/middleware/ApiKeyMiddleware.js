const asyncHandler = require('express-async-handler');

const ApiKeyMiddleware = asyncHandler(async (req, res, next) => {
  let key = null;

  const keys = process.env.KEYS.split(',');

  if (req.query.key) {
    key = req.query.key;
  }

  if (!key) {
    res.status(403);
    throw new Error('403 Forbidden');
  }

  try {
    if (!keys.includes(key)) {
      res.status(401);
      throw new Error('401 Unauthorized: Invalid API key');
    }

    next();
  } catch (error) {
    res.status(401);
    throw new Error(error.message);
  }
});

module.exports = ApiKeyMiddleware;
