import Joi from 'joi';

const schema = Joi.object().keys({
  name: Joi.string(),
  isPrivate: Joi.bool(),
  type: Joi.string().valid(['company', 'school', 'personal']),
  members: Joi.array(), // Array of user IDs
  location: Joi.string(),
  email: Joi.string(),
  admins: Joi.array(),
  about: Joi.string(),
  achievements: Joi.array()
});

export default schema;
