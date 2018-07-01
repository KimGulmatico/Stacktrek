const restrictToOwner = (options = { idField: '_id', ownerField: '' }) => (hook) => {
  const { idField, ownerField } = options

  if (hook.type !== 'before') {
    throw new Error('The restrictToOwner should be used as a before hook (restrictToOwner)')
  }

  // if called from the server
  if (!hook.params.provider) {
    return hook
  }

  // disable multiple changes
  if (!hook.id) {
    throw new Error('Multiple element changes is disabled (restricToOwner)')
  }

  return hook.service.get(hook.id).then((data) => {
    if (!hook.params.user || !hook.params.user[idField]) {
      throw new Error('User entity does not exist (restrictToOwner)')
    }

    if (ownerField instanceof Array) {
      let isAuthorized = false

      ownerField.forEach((key) => {
        if (data[key] && data[key].toString() === hook.params.user[idField].toString()) {
          isAuthorized = true
        }
      })

      if (isAuthorized) return hook
    } else if (data[ownerField].toString() === hook.params.user[idField].toString()) {
      return hook
    }

    throw new Error('Not authorized to execute this method (restrictToOwner)')
  })
}

export default restrictToOwner
