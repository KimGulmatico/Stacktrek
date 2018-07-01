import validate from 'feathers-hooks-validate-joi'
import skillEnumSchema from '../../../models/SkillEnum'

const joiOptions = { convert: true, abortEarly: false }

module.exports = {
  before: {
    all: [],
    find: [],
    get: [],
    create: [validate.form(skillEnumSchema, joiOptions)],
    update: [],
    patch: [],
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
