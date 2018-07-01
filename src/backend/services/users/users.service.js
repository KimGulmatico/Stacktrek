// Initializes the `users` service on path `/users`
const createService = require('feathers-mongodb')
const hooks = require('./users.hooks')

module.exports = function setupService(app) {
  const mongoClient = app.get('mongoClient')
  const paginate = {
    paginate: { default: 8, max: 50 },
  }

  // Initialize our service with any options it requires
  app.use('users', createService(paginate))

  // Get our initialized service so that we can register hooks and filters
  const service = app.service('users')

  mongoClient.then(async (db) => {
    service.Model = db.collection('users')
    await db.collection('users').createIndex({
      email: 'text',
      firstname: 'text',
      lastname: 'text',
      middlename: 'text',
      school: 'text',
      company: 'text',
    })
  })

  service.hooks(hooks(app))
}
