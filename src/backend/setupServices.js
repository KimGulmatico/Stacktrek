import setupService from './setupService'

function setupServices() {
  return function setupPlugins() {
    const app = this
    app.configure(setupService('users'))
  }
}

export default setupServices
