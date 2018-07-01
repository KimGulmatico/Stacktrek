function noDuplicateAccount() {
  return async function execute(hook) {
    const userService = hook.app.service('users')
    const emailResult = await userService.find({ query: { email: hook.data.email } })
    const fbIdResult = await userService.find({ query: { email: hook.data.fbId } })
    if (emailResult.total !== 0 && fbIdResult !== 0) {
      throw new Error('Account for this email/FB account already exists')
    }
  }
}

export default noDuplicateAccount
