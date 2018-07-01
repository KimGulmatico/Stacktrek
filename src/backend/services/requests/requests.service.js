// Initializes the `users` service on path `/requests`
const createService = require('feathers-mongodb')
const hooks = require('./requests.hooks')

module.exports = function setupService(app) {
  const mongoClient = app.get('mongoClient')
  const paginate = {
    paginate: { default: 6, max: 50 },
  }
  // Initialize our service with any options it requires
  app.use('api/requests', createService(paginate))

  // Get our initialized service so that we can register hooks and filters
  const service = app.service('api/requests')

  mongoClient.then((db) => {
    service.Model = db.collection('requests')
  })

  service.hooks(hooks)
}
