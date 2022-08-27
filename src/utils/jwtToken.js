require('dotenv').config();
const jwt = require('jsonwebtoken');

const SECRET = process.env.JWT_SECRET;
const jwtConfig = {
  expiresIn: '1d',
  algorithm: 'HS256',
};

module.exports = {
  tokenGenerate: (userData) => {
    const token = jwt.sign(userData, SECRET, jwtConfig);
    return token;
  },

  tokenValidate: (token) => {
    if (!token) return { status: 401, message: 'Token not found' };
    const decode = jwt.verify(token, SECRET, (err) => {
      if (err) return { status: 401, message: 'Expired or invalid token' };
    });
    return decode;
  },
};