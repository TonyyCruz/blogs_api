const { BlogPost } = require('../../database/models');

const userPostExists = async ({ postPk }) => (
  BlogPost.findOne({ where: { id: postPk } })
);

const userPostValidate = async ({ userId, postPk }) => (
  BlogPost.findOne({ where: { userId, id: postPk } })
);

module.exports = async ({ userId, postPk }) => {
  if (!await userPostExists({ postPk })) {
    return { status: 404, message: 'Post does not exist' };
  }
  
  if (await userPostValidate({ userId, postPk })) return {};
  return { status: 401, message: 'Unauthorized user' };
};