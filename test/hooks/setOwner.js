import setOwner from '../../src/backend/hooks/setOwner'

describe('setOwner', () => {
  it('Throws an error if not used as a before hook', async () => {
    const context = {
      type: 'after',
    }
    let res

    try {
      res = await setOwner()(context)
    } catch (e) {
      res = e
    }

    assert(res.toString(), 'Error: This should be used as a before hook (setOwner)')
  })

  it('Throws an error if hook method is not create', async () => {
    const context = {
      type: 'before',
      method: 'update',
    }
    let res

    try {
      res = await setOwner()(context)
    } catch (e) {
      res = e
    }

    assert(res.toString(), 'Error: This should be used on create method (setOwner)')
  })

  it('Should throw an error if user entity undefined', async () => {
    const context = {
      type: 'before',
      method: 'create',
      params: {
        user: undefined,
      },
    }
    let res

    try {
      res = await setOwner()(context)
    } catch (e) {
      res = e
    }

    assert.equal(res.toString(), 'Error: There is no user entity (setOwner)')
  })

  it('Should throw an error if user idField is not defined', async () => {
    const context = {
      type: 'before',
      method: 'create',
      params: {
        user: {
          myId: '123',
        },
      },
    }

    const options = {
      idField: '_id',
      ownerField: 'ownerId',
    }
    let res

    try {
      res = await setOwner(options)(context)
    } catch (e) {
      res = e
    }

    assert.equal(res.toString(), 'Error: idField does not exist (setOwner)')
  })

  it('Should populate data ownerField with the user id', async () => {
    const context = {
      type: 'before',
      method: 'create',
      params: {
        user: {
          _id: '123',
        },
      },
      data: {
        name: 'Javascript',
      },
    }

    const options = {
      idField: '_id',
      ownerField: 'ownerId',
    }

    await setOwner(options)(context)
    assert.equal(context.data.ownerId, context.params.user._id)
  })

  it('Should populate the array of data ownerField with the user id', async () => {
    const context = {
      type: 'before',
      method: 'create',
      params: {
        user: {
          _id: '123',
        },
      },
      data: [
        { name: 'Javascript' },
        { name: 'Potato' },
      ],
    }

    const options = {
      idField: '_id',
      ownerField: 'ownerId',
    }

    await setOwner(options)(context)
    assert.equal(context.data[0].ownerId, context.params.user._id)
    assert.equal(context.data[1].ownerId, context.params.user._id)
  })
})
