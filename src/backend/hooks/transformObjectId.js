import { ObjectID } from 'mongodb'

const transformObjectId = () => (hook) => {
  //   console.log(hook.params.query._id.$ne
  if (hook.params.query._id && hook.params.query._id.$ne && hook.params.query._id.$in) {
    const _id = hook.params.query._id
    if (_id && _id.$ne) {
      _id.$ne = new ObjectID(_id.$ne)
    }
    if (_id && _id.$in) {
      _id.$in = _id.$in.map(id => new ObjectID(id))
    }
    hook.params.query._id = _id
  } else if (hook.params.query._id && hook.params.query._id.$ne) {
    let _id = hook.params.query._id.$ne
    if (_id) {
      _id = new ObjectID(_id)
    }
    hook.params.query._id.$ne = _id
    return hook
  } else if (hook.params.query._id && hook.params.query._id.$in) {
    const _id = hook.params.query._id
    if (_id && _id.$in) {
      _id.$in = _id.$in.map(id => new ObjectID(id))
    }
    // hook.params.query._id.$in = _id.$in
    return hook
  } else if (hook.params.query._id && hook.params.query._id.$nin) {
    const _id = hook.params.query._id
    if (_id && _id.$nin) {
      _id.$nin = _id.$nin.map(id => new ObjectID(id))
    }
    hook.params.query._id.$nin = _id.$nin
    return hook
  }
}

export default transformObjectId
