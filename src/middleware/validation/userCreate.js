const Joi = require('joi');
const { User } = require('../../database/models');

const STRING_BASE = '{#label} must be a string | 400';
const STRING_EMPTY = '{#label} is required | 400';
const STRING_MIN = '{#label} length must be at least {#limit} characters long | 400';
const STRING_MAX = '{#label} length must be at less {#limit} characters | 400';

const userJoiValidation = Joi.object({
  displayName: Joi.string().min(8).max(80).required()
    .messages({
      'string.base': STRING_BASE,
      'string.empty': STRING_EMPTY,
      'string.min': STRING_MIN,
      'string.max': STRING_MAX,
    }),
  email: Joi.string().email().min(8).max(80)
    .required()
    .messages({
      'string.base': STRING_BASE,
      'string.empty': STRING_EMPTY,
      'string.min': STRING_MIN,
      'string.max': STRING_MAX,
      'string.email': '"email" must be a valid email | 400',
    }),
  password: Joi.string().min(6).max(60).required()
  .messages({
    'string.base': STRING_BASE,
    'string.empty': STRING_EMPTY,
    'string.min': STRING_MIN,
    'string.max': STRING_MAX,
  }),
}).required().messages({
  'any.required': '{#label} is required | 400',
});

const dataTypeValidation = ({ displayName, email, password }) => {
  const result = userJoiValidation.validate({ displayName, email, password });
  if (!result.error) return {};
  const { message: error } = result.error.details[0];
  const [message, status] = error.split(' |');
  return { message, status };
};

const emailAlreadyExists = (email) => User.findOne({ where: { email } });

module.exports = {
  createUserValidation: async ({ displayName, email, password }) => {
    const validateData = dataTypeValidation({ displayName, email, password });
    if (validateData.message) return validateData;
    if (await emailAlreadyExists(email)) {
      return { message: 'User already registered', status: 409 };
    }
    return {};
  },
};
