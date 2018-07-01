import validate from 'feathers-hooks-validate-joi';
import tagSchema from '../../../models/Tag';

const { authenticate } = require('@feathersjs/authentication').hooks;

const joiOptions = { convert: true, abortEarly: false };

module.exports = {
  before: {
    all: [],
    find: [],
    get: [],
    create: [validate.form(tagSchema, joiOptions)],
    update: [validate.form(tagSchema, joiOptions)],
    patch: [validate.form(tagSchema, joiOptions)],
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
