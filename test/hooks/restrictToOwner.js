import restrictToOwner from '../../src/backend/hooks/restrictToOwner'

describe('restrictToOwner', () => {
  it('Throws an error if not used as a before hook', async () => {
    const hook = {
      type: 'after',
    }
    let res
    try {
      res = await restrictToOwner()(hook)
    } catch (e) {
      res = e
    }
    assert(res instanceof Error)
  })

  it('Returns the hook if it is used by the backend/server', async () => {
    const hook = {
      type: 'before',
      params: {
        provider: undefined,
      },
    }
    const res = await restrictToOwner()(hook)
    assert.equal(res, hook)
  })

  it('Throws an error if there is no user in hook data', async () => {
    const hook = {
      type: 'before',
      params: {
        provider: 'socketi',
        user: undefined,
      },
    }

    let res
    try {
      res = await restrictToOwner()(hook)
    } catch (e) {
      res = e
    }
    assert(res instanceof Error)
  })

  it('Throws an error if used with multiple changes', async () => {
    const hook = {
      type: 'before',
      id: undefined,
      params: {
        provider: 'socketio',
        user: {},
      },
    }

    let res
    try {
      res = await restrictToOwner()(hook)
    } catch (e) {
      res = e
    }
    assert(res instanceof Error)
  })

  it('Returns the hook if user is the owner', async () => {
    const hook = {
      type: 'before',
      method: 'get',
      id: 123,
      params: {
        provider: 'socketio',
        user: {
          _id: 123,
        },
      },
      service: {
        get() {
          return Promise.resolve({ owner: 123 })
        },
      },
    }

    const res = await restrictToOwner({ idField: '_id', ownerField: 'owner' })(hook)
    assert(res, hook)
  })

  it('Returns the hook if user is the owner and ownerField is an array', async () => {
    const hook = {
      type: 'before',
      method: 'get',
      id: 123,
      params: {
        provider: 'socketio',
        user: {
          _id: 123,
        },
      },
      service: {
        get() {
          return Promise.resolve({ owner: 123 })
        },
      },
    }

    const res = await restrictToOwner({ idField: '_id', ownerField: ['asdsads', 'owner'] })(hook)
    assert(res, hook)
  })

  it('Should throw an error if user is not the owner and ownerField is an array', async () => {
    const hook = {
      type: 'before',
      method: 'get',
      id: 123,
      params: {
        provider: 'socketio',
        user: {
          _id: 123,
        },
      },
      service: {
        get() {
          return Promise.resolve({ owner: 123 })
        },
      },
    }

    let res
    try {
      res = await restrictToOwner({ idField: '_id', ownerField: ['asdsads', 'cooks'] })(hook)
    } catch (e) {
      res = e
    }
    assert(res.toString(), 'Error: Not authorized to execute this method (restrictToOwner)')
  })
})
