const setOwner = (options = { idField: '_id', ownerField: 'ownerId' }) => (hook) => {
  const { idField, ownerField } = options

  if (hook.type !== 'before') {
    throw new Error('This should be used as a before hook (setOwner)')
  }

  if (hook.method !== 'create') {
    throw new Error('This should be used on create method (setOwner)')
  }

  if (!hook.params.user) {
    throw new Error('There is no user entity (setOwner)')
  }

  if (!hook.params.user[idField]) {
    throw new Error('idField does not exist (setOwner)')
  }

  const id = hook.params.user[idField].toString()

  if (hook.data instanceof Array) {
    hook.data = hook.data.map((a) => { a[ownerField] = id; return a })
  } else {
    hook.data[ownerField] = id
  }
}

export default setOwner
