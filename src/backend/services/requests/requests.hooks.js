import validate from 'feathers-hooks-validate-joi'
import auth from '@feathersjs/authentication'
import { setNow } from 'feathers-hooks-common'
import groupSchema from '../../../models/Request'
import transformObjectId from '../../../backend/hooks/transformObjectId'
import noDuplicateRequests from '../../../backend/hooks/noDuplicateRequests'
import sendToMessenger from '../../hooks/sendToMessenger'
import disablePaginate from '../../hooks/disablePaginate'
import restrictToOwner from '../../hooks/restrictToOwner'
import addRecipientAddress from './hooks/addRecipientAddress'

const joiOptions = { convert: true, abortEarly: false }

module.exports = {
  before: {
    all: [
    ],
    find: [
      transformObjectId(),
      disablePaginate(),
    ],
    get: [],
    create: [
      setNow('createdAt'),
      auth.hooks.authenticate('jwt'),
      noDuplicateRequests(),
      addRecipientAddress(),
      validate.form(groupSchema, joiOptions),
    ],
    update: [
      auth.hooks.authenticate('jwt'),
      restrictToOwner({ idField: '_id', ownerField: ['sender', 'recipient'] }),
      // validate.form(groupSchema, joiOptions)
    ],
    patch: [
      auth.hooks.authenticate('jwt'),
      restrictToOwner({ idField: '_id', ownerField: ['sender', 'recipient'] }),
      validate.form(groupSchema, joiOptions),
    ],
    remove: [
      auth.hooks.authenticate('jwt'),
      restrictToOwner({ idField: '_id', ownerField: ['sender', 'recipient'] }),
    ],
  },

  after: {
    all: [],
    find: [
    ],
    get: [],
    create: [
      sendToMessenger(),
    ],
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
