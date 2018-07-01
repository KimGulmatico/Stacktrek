import Joi from 'joi';

const schema = Joi.object().keys({
  userID: Joi.string(),
  eventID: Joi.string(),
  result: Joi.string(),
});

export default schema;
