import Joi from 'joi';

const schema = Joi.object().keys({
  name: Joi.string(),
  type: Joi.string(),
  image: Joi.string().base64(),
  description: Joi.string(),
});

export default schema;
