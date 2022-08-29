require('dotenv').config();
const jwt = require('jsonwebtoken');

const SECRET = process.env.JWT_SECRET;

module.exports = (token) => {
  if (!token) return { status: 401, message: 'Token not found' };

  const decode = jwt.verify(token, SECRET, (err) => {
    if (err) return { status: 401, message: 'Expired or invalid token' };
    
    const userData = jwt.verify(token, SECRET);

    return {
      id: userData.id, displayName: userData.displayName, email: userData.email,
    };
  });

  return decode;
};