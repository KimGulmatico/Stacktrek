// Initializes the `users` service on path `/groups`
const createService = require('feathers-mongodb');
const hooks = require('./groups.hooks');

module.exports = function setupService(app) {
  const paginate = app.get('paginate');
  const mongoClient = app.get('mongoClient');
  const options = { paginate };

  // Initialize our service with any options it requires
  app.use('api/groups', createService(options));

  // Get our initialized service so that we can register hooks and filters
  const service = app.service('api/groups');

  mongoClient.then((db) => {
    service.Model = db.collection('groups');
  });

  service.hooks(hooks);
};
