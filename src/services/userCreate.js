const { User } = require('../database/models');
const { tokenGenerate } = require('../utils/jwtToken');

module.exports = async ({ displayName, email, password, image }) => {
  const userData = await User.create({ displayName, email, password, image });
  if (!userData) return { status: 400, message: 'Unexpected error' };

  const token = tokenGenerate({ displayName, email, password });
  return { status: 201, token: { token } };
};