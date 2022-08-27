const { User } = require('../database/models');
const { tokenGenerate } = require('../utils/jwtToken');

module.exports = {
  create: async ({ displayName, email, password, image }) => {
    const userData = await User.create({ displayName, email, password, image });
    if (!userData) return { status: 400, message: 'Unexpected error' };
  
    const token = tokenGenerate({ displayName, email, password });
    return { status: 201, token: { token } };
  },

  findAll: async () => {
    const data = await User.findAll({
      attributes: { exclude: ['password'] } });
    if (!data) return { status: 400, message: 'Unexpected error' };
    console.log(data);
    return { status: 200, data };
  },
};