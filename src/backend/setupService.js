function setupService(serviceName, hooks) {
  return function setupPlugin() {
    const app = this
    const service = app.service(`${serviceName}`)
    service.hooks(hooks)
  }
}

export default setupService
