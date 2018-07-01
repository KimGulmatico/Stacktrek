// Initializes the `users` service on path `/tags`
const createService = require('feathers-mongodb');
const hooks = require('./tags.hooks');

module.exports = function setupService(app) {
  const paginate = app.get('paginate');
  const mongoClient = app.get('mongoClient');
  const options = { paginate };

  // Initialize our service with any options it requires
  app.use('tags', createService(options));

  // Get our initialized service so that we can register hooks and filters
  const service = app.service('tags');

  mongoClient.then((db) => {
    service.Model = db.collection('tags');
  });

  service.hooks(hooks);
};
