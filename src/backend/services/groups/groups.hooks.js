import validate from 'feathers-hooks-validate-joi';
import groupSchema from '../../../models/Group';

const { authenticate } = require('@feathersjs/authentication').hooks;

const joiOptions = { convert: true, abortEarly: false };

module.exports = {
  before: {
    all: [],
    find: [],
    get: [],
    create: [validate.form(groupSchema, joiOptions)],
    update: [validate.form(groupSchema, joiOptions)],
    patch: [validate.form(groupSchema, joiOptions)],
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
};
