import Joi from 'joi';

const schema = Joi.object().keys({
  name: Joi.string(),
  total: Joi.number(),
  point: Joi.number().min(0).positive(),
});

export default schema;
