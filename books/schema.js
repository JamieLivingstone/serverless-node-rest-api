const Joi = require("@hapi/joi");

const bookSchema = Joi.object().keys({
  title: Joi.string()
    .min(1)
    .required(),
  author: Joi.string()
    .min(1)
    .required(),
  pages: Joi.number().required()
});

function validateModel(model) {
  return Joi.validate(model, bookSchema, { abortEarly: false });
};

module.exports = {
    validateModel
};