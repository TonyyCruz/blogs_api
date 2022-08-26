require('dotenv').config();
const jwt = require('jsonwebtoken');

const secret = process.env.JWT_SECRET;
const jwtConfig = {
  expiresIn: '1d',
  algorithm: 'HS256',
};

module.exports = {
  tokenGenerate: (userData) => {
    const token = jwt.sign(userData, secret, jwtConfig);
    return token;
  },
};