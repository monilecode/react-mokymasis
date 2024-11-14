const jwt = require('jsonwebtoken');

const expiresIn = process.env.JWT_EXPIRATION;
const generateToken = (payload) => {
  const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn });
  return token;
};

module.exports = { generateToken };
