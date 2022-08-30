const Joi = require('joi');
const { BlogPost } = require('../../database/models');

const STRING_BASE = '{#label} must be a string | 400';
const STRING_EMPTY = 'Some required fields are missing | 400';

const postJoiValidate = Joi.object({
  title: Joi.string().required()
  .messages({
    'string.base': STRING_BASE,
    'string.empty': STRING_EMPTY,
  }),

  content: Joi.string().required()
  .messages({
    'string.base': STRING_BASE,
    'string.empty': STRING_EMPTY,
  }),

}).required().messages({
  'any.required': 'Some required fields are missing | 400',
});

const postJoiValidation = ({ title, content }) => {
  const result = postJoiValidate.validate({ title, content });
  if (!result.error) return {};

  const { message: error } = result.error.details[0];
  const [message, status] = error.split(' | ');

  return { message, status };
};

const userIdVerify = async ({ userId, postPk }) => (
  BlogPost.findAll({ where: { userId, id: postPk } })
);

module.exports = async ({ userId, title, content, postPk }) => {
  const validateData = postJoiValidation({ title, content });
  if (validateData.message) return validateData;

  const postData = await userIdVerify({ userId, postPk });

  if (postData.length) return {};
  return { status: 401, message: 'Unauthorized user' };
};