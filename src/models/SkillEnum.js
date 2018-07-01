import Joi from 'joi'

const schema = Joi.object().keys({
  name: Joi.string().required(),
})

export default schema
