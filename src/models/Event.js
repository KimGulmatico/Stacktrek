import Joi from 'joi';

const schema = Joi.object().keys({
  name: Joi.string(),
  title: Joi.string(),
  eventStart: Joi.date(),
  eventEnd: Joi.date(),
  location: Joi.string(),
  registrationStart: Joi.bool(),
  registrationEnd: Joi.date(),
  banner: Joi.string().base64(),
  state: Joi.string(),
  city: Joi.string(),
  street: Joi.string(),
  zipCode: Joi.string(),
  organizer: Joi.string(),
  faq: Joi.string(),
  howToPrepare: Joi.string(),
  overview: Joi.string(),
});

export default schema;
