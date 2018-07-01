const noDuplicateSkill = () => async (hook) => {
  if (hook.type !== 'before') {
    throw new Error('noDuplicateSkill should be used as a before hook')
  }

  const { ownerId, name } = hook.data
  try {
    const res = await hook.app.service('api/skills').find({ query: { ownerId, name } })

    if (res.length !== 0) {
      throw new Error(`This user already have ${name} added. No duplicate skills per user.`)
    }
  } catch (e) {
    throw new Error(e)
  }
}

export default noDuplicateSkill
