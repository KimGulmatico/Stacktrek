import Joi from 'joi'

const keys = {
  ownerId: Joi.string(),
  title: Joi.string(),
  company: Joi.string(),
  start: Joi.date(),
  end: Joi.alternatives().try(Joi.date(), Joi.string()),
  endorsers: Joi.array(), // Contains IDs of users that endorsed the skill
  present: Joi.boolean(),
}

const schema = Joi
  .alternatives()
  .try(Joi.object().keys(keys), Joi.array().items(Joi.object().keys(keys)))

export default schema
