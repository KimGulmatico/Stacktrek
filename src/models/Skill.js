import Joi from 'joi'

const keys = {
  ownerId: Joi.string(),
  name: Joi.string(),
  value: Joi.number(),
  endorsers: Joi.array(), // Contains IDs of users that endorsed the skill
}

const schema = Joi
  .alternatives()
  .try(Joi.object().keys(keys), Joi.array().items(Joi.object().keys(keys)))

export default schema
