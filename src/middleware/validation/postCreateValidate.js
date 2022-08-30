const Joi = require('joi');
const { Category } = require('../../database/models');

const STRING_BASE = '{#label} must be a string | 400';
const STRING_EMPTY = 'Some required fields are missing | 400';
const CATEGORY_ID_ERROR = '"categoryIds" not found | 400';
const NUMBER_BASE = '{#label} must be a number | 400';
const NUMBER_INTEGER = '{#label} must be a integer | 400';
const ARRAY_BASE = '"categoryIds" must be a array | 400';

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

  categoryIds: Joi.array().min(1).items(Joi.number().integer().min(1)
  .required()
  .messages({
    'number.base': NUMBER_BASE,
    'number.empty': CATEGORY_ID_ERROR,
    'number.integer': NUMBER_INTEGER,
    'number.min': CATEGORY_ID_ERROR,
  }))

  .required()
  .messages({
    'array.base': ARRAY_BASE,
    'array.empty': CATEGORY_ID_ERROR,
    'array.min': CATEGORY_ID_ERROR,
  }),

}).required().messages({
  'any.required': 'Some required fields are missing | 400',
});

const postJoiValidation = ({ title, content, categoryIds }) => {
  const result = postJoiValidate.validate({ title, content, categoryIds });
  if (!result.error) return {};

  const { message: error } = result.error.details[0];
  const [message, status] = error.split(' | ');

  return { message, status };
};

const categoryIdVerify = async (categoryIds) => {
  const categoryExists = await Promise.all(categoryIds.map(async (id) => (
    Category.findOne({ where: { id } })
  )));

  return categoryExists.every((category) => category);
};

module.exports = async ({ title, content, categoryIds }) => {
  const validateData = postJoiValidation({ title, content, categoryIds });
  if (validateData.message) return validateData;

  if (await categoryIdVerify(categoryIds)) return {};
  return { status: 400, message: '"categoryIds" not found' };
};