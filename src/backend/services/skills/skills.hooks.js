import validate from 'feathers-hooks-validate-joi'
import auth from '@feathersjs/authentication'
import skillSchema from '../../../models/Skill'
import noDuplicateSkill from '../../hooks/noDuplicateSkill'
import setOwner from '../../hooks/setOwner'
import restrictToOwner from '../../hooks/restrictToOwner'

const joiOptions = { convert: true, abortEarly: false }

// This might be useful in the future™
// const skillResolvers = app => ({
//   joins: {
//     endorsers: () => async (skill) => {
//       skill.endorsers = (
//         await app.service('api/requests').find({
//           query: {
//             $and: [
//               { type: 'ATTEST_SKILL' },
//               { status: 'APPROVED' },
//               { sender: skill.ownerId },
//               { 'data.name': skill.name },
//             ],
//           },
//           paginate: false,
//         })
//       )
//     },
//   },
// })

module.exports = () => ({
  before: {
    all: [],
    find: [],
    get: [],
    create: [
      auth.hooks.authenticate('jwt'),
      setOwner(),
      validate.form(skillSchema, joiOptions),
      noDuplicateSkill(),
    ],
    update: [
      auth.hooks.authenticate('jwt'),
      restrictToOwner({ idField: '_id', ownerField: 'ownerId' }),
      validate.form(skillSchema, joiOptions),
    ],
    patch: [
      auth.hooks.authenticate('jwt'),
      restrictToOwner({ idField: '_id', ownerField: 'ownerId' }),
      validate.form(skillSchema, joiOptions),
    ],
    remove: [
      auth.hooks.authenticate('jwt'),
      restrictToOwner({ idField: '_id', ownerField: 'ownerId' }),
    ],
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
})
