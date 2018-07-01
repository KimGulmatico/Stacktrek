// Initializes the `users` service on path `api/skills`
const createService = require('feathers-mongodb')
const hooks = require('./skills.hooks')

module.exports = function setupService(app) {
  const mongoClient = app.get('mongoClient')

  // Initialize our service with any options it requires
  app.use('api/skills', createService({}))

  // Get our initialized service so that we can register hooks and filters
  const service = app.service('api/skills')

  mongoClient.then((db) => {
    service.Model = db.collection('skills')
  })

  service.hooks(hooks(app))
}
