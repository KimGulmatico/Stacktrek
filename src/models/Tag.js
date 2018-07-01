import Joi from 'joi';

const schema = Joi.object().keys({
  name: Joi.string(),
  type: Joi.string().valid(['GROUP', 'SKILL']),
});

export default schema;
