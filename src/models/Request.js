import Joi from 'joi'

const keys = {
  type: Joi.string().valid(['CONNECT_USER', 'JOIN_GROUP', 'ATTEST_SKILL', 'ATTEST_SCHOOL', 'ATTEST_EXPERIENCE']),
  status: Joi.string().valid(['PENDING', 'APPROVED', 'REJECTED']),
  data: Joi.object(),
  sender: Joi.string(),
  recipient: Joi.string(),
  senderName: Joi.string(),
  senderFBID: Joi.string(),
  recipientFBID: Joi.string(),
  endorseeEthAddress: Joi.string(),
  createdAt: Joi.date(),
}

const schema = Joi
  .alternatives()
  .try(Joi.object().keys(keys), Joi.array().items(Joi.object().keys(keys)))

export default schema
