const handleSkillPatch = () => async (hook) => {
  if (hook.params.query && hook.params.query.incSkill) {
    hook.data = { $inc: { 'skills.$.value': 1 } }
    hook.params.query = { 'skills.name': hook.params.query.incSkill }
  }
  return hook
}

export default handleSkillPatch
