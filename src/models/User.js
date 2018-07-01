import Joi from 'joi'

const schema = Joi.object().keys({
  _id: Joi.any(),
  email: Joi.string().email(),
  password: Joi.string(), // Password will not be stored
  firstname: Joi.string(),
  middlename: Joi.string(),
  lastname: Joi.string(),
  company: Joi.string(),
  school: Joi.string(),
  badges: Joi.array(), // Contains id of badges
  location: Joi.string(),
  skills: Joi.array(), // Maybe use blockchain for this
  experiences: Joi.array(), // Maybe use blockchain for this
  bio: Joi.string().allow(''), // A short description of the user
  net: Joi.array(), // Refers to people the user have connected to
  requests: Joi.array(), // Refers to connect requests (works like Facebook friend requests)
  provider: Joi.string(), // Refers to the auth provider used (i.e Facebook)
  facebookId: Joi.string(), // The field to look up the entity by when logging in with the provider
  birthday: Joi.string(),
  gender: Joi.string(),
  verified: Joi.any(),
  currency: Joi.any(),
  devices: Joi.any(),
  locale: Joi.any(),
  timezone: Joi.any(),
  context: Joi.any(),
  contactNumber: Joi.string(),
  $push: Joi.any(),
  $set: Joi.any(),
  psid: Joi.string(),
  requestedUsers: Joi.array(),
  userRequestsReceived: Joi.array(),
  ethAddress: Joi.string(),
  facebookLink: Joi.string().allow(''),
})

export default schema
