// only allows requests for
const noDuplicateRequests = () => async (hook) => {
  if (hook.type !== 'before') {
    throw new Error('noDuplicateRequests should be used as a before hook')
  }

  const {
    sender, recipient, type,
  } = hook.data

  try {
    let res1
    let res2

    if (type === 'ATTEST_EXPERIENCE') { return hook }

    if (type === 'ATTEST_SKILL') {
      const { data: { name } } = hook.data
      res1 = await hook.app.service('api/requests').find({ query: { $and: [{ sender }, { recipient }, { type }, { 'data.name': name }] }, paginate: false })
    }

    if (type === 'CONNECT_USER') {
      res1 = await hook.app.service('api/requests').find({ query: { $and: [{ sender }, { recipient }, { type }] }, paginate: false })
      res2 = await hook.app.service('api/requests').find({ query: { $and: [{ sender: recipient }, { recipient: sender }, { type }] }, paginate: false })
    }

    if (res1.length !== 0 || (res2 && res2.length !== 0)) {
      throw new Error('This is a duplicate request. A similar request was probably sent already. From noDuplicateRequest hooks')
    }
  } catch (e) {
    throw new Error(e)
  }
}

export default noDuplicateRequests
