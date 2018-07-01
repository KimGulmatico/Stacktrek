import validate from 'feathers-hooks-validate-joi'
import { fastJoin, iff } from 'feathers-hooks-common'
import auth from '@feathersjs/authentication'
import userSchema from '../../../models/User'
import customizeProviderData from '../../hooks/customizeProviderData'
import transformObjectId from '../../hooks/transformObjectId'
import handleSkillPatch from '../../hooks/handleSkillPatch'
import disablePaginate from '../../hooks/disablePaginate'
import restrictToOwner from '../../hooks/restrictToOwner'

const joiOptions = { convert: true, abortEarly: false }

const userResolvers = app => ({
  joins: {
    requestedUsers: () => async (user) => {
      user.requestedUsers = (
        await app.service('api/requests').find({
          query: {
            $and: [{ status: 'PENDING' },
              { sender: user._id.toString() },
              { type: 'CONNECT_USER' }],
          },
          paginate: false,
        })).map(req => req.recipient)
    },
  },
})

module.exports = app => ({
  before: {
    all: [],
    find: [
      transformObjectId(),
      disablePaginate(),
    ],
    get: [],
    create: [
      customizeProviderData(),
      validate.form(userSchema, joiOptions),
    ],
    update: [
      auth.hooks.authenticate('jwt'),
      restrictToOwner({ ownerField: '_id', idField: '_id' }),
      customizeProviderData(),
      validate.form(userSchema, joiOptions),
    ],
    patch: [
      auth.hooks.authenticate('jwt'),
      restrictToOwner({ ownerField: '_id', idField: '_id' }),
      customizeProviderData(),
      iff(hook => (hook.params.query && hook.params.query.incSkill), handleSkillPatch())
        .else(validate.form(userSchema, joiOptions)),
    ],
    remove: [
      auth.hooks.authenticate('jwt'),
      restrictToOwner({ ownerField: '_id', idField: '_id' }),
    ],
  },

  after: {
    all: [],
    find: [],
    get: [
      fastJoin(userResolvers(app)),
    ],
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
})
