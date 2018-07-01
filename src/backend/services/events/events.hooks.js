import validate from 'feathers-hooks-validate-joi';
import eventSchema from '../../../models/Event';

const { authenticate } = require('@feathersjs/authentication').hooks;

const joiOptions = { convert: true, abortEarly: false };

module.exports = {
  before: {
    all: [],
    find: [],
    get: [],
    create: [validate.form(eventSchema, joiOptions)],
    update: [validate.form(eventSchema, joiOptions)],
    patch: [validate.form(eventSchema, joiOptions)],
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
