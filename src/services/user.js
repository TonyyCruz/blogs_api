const { User } = require('../database/models');
const { tokenGenerate } = require('../utils/jwtToken');

module.exports = {
  create: async ({ displayName, email, password, image }) => {
    const userData = await User.create({ displayName, email, password, image });

    if (!userData) return { status: 401, message: 'Unexpected error' };

    const token = tokenGenerate({
      displayName,
      email,
      password,
      id: userData.dataValues.id,
    });

    return { status: 201, token: { token } };
  },

  findAll: async () => {
    const data = await User.findAll({
      attributes: { exclude: ['password'] } });
    if (!data) return { status: 401, message: 'Unexpected error' };
    return { status: 200, data };
  },

  findByPk: async ({ id }) => {
    const data = await User.findByPk(id,
      { attributes: { exclude: ['password'] } });
    if (!data) return { status: 404, message: 'User does not exist' };
    return { status: 200, data: data.dataValues };
  },

  delete: async ({ id }) => {
    const data = await User.destroy({ where: { id } });
    if (!data) return { status: 404, message: 'Delete fail' };
    return { status: 204, data: '' };
  },
};