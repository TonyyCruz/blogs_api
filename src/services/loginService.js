const { User } = require('../database/models');
const { tokenGenerate } = require('../utils/jwtToken');

module.exports = async ({ email, password }) => {
  if (!email || !password) return { status: 401, message: 'Missing data' };

  const user = await User.findOne({
    attributes: ['displayName', 'email', 'password'],
    where: { email, password },
  });

  if (!user) return { status: 401, message: 'Email or  password invalid' };

  const token = tokenGenerate(user.dataValues);
  return { status: 200, token };
};
