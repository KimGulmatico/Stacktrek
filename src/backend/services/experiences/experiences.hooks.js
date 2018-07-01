import validate from 'feathers-hooks-validate-joi'
import experienceSchema from '../../../models/Experience'
import setOwner from '../../hooks/setOwner'
import disablePaginate from '../../hooks/disablePaginate'

const joiOptions = { convert: true, abortEarly: false }

module.exports = {
  before: {
    all: [],
    find: [
      disablePaginate(),
    ],
    get: [],
    create: [
      setOwner(),
      validate.form(experienceSchema, joiOptions),
    ],
    update: [
      validate.form(experienceSchema, joiOptions),
    ],
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
