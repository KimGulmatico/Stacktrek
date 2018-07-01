// Initializes the `users` service on path `/users`
const createService = require('feathers-mongodb');
const hooks = require('./events.hooks');

module.exports = function setupService(app) {
  const paginate = app.get('paginate');
  const mongoClient = app.get('mongoClient');
  const options = { paginate };

  // Initialize our service with any options it requires
  app.use('events', createService(options));

  // Get our initialized service so that we can register hooks and filters
  const service = app.service('events');

  mongoClient.then((db) => {
    service.Model = db.collection('events');
  });

  service.hooks(hooks);
};
