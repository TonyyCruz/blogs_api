const { User } = require('../database/models');
const { tokenGenerate } = require('../utils/jwtToken');

module.exports = async ({ email, password }) => {
  if (!email || !password) {
    return { status: 400, message: 'Some required fields are missing' };
  }

  const user = await User.findOne({
    attributes: ['displayName', 'email', 'password'],
    where: { email, password },
  });

  if (!user) return { status: 400, message: 'Invalid fields' };

  const token = tokenGenerate(user.dataValues);
  return { status: 200, token: { token } };
};
