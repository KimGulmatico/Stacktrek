import validate from 'feathers-hooks-validate-joi'
import userSchema from '../../../models/Badge'

const { authenticate } = require('@feathersjs/authentication').hooks

const joiOptions = { convert: true, abortEarly: false }

module.exports = {
  before: {
    all: [],
    find: [],
    get: [],
    create: [validate.form(userSchema, joiOptions)],
    update: [validate.form(userSchema, joiOptions)],
    patch: [validate.form(userSchema, joiOptions)],
    remove: [],
  },

  after: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: [],
  },

  error: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: [],
  },
}
