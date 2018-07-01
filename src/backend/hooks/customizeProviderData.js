const customizeProviderData = () => async (hook) => {
  if (hook.type !== 'before') {
    throw new Error('This should be used as a before hook')
  }

  const updatedHook = hook

  if (hook.data.facebook) {
    const {
      email,
      first_name,
      last_name,
      id,
      facebookId,
      birthday,
      gender,
      verified,
      currency,
      devices,
      locale,
      timezone,
      context,
      link,
    } = hook.data.facebook.profile._json
    if (hook.method === 'create') {
      updatedHook.data = {}
      updatedHook.data.provider = 'facebook'
      updatedHook.data.facebookId = id
      updatedHook.data.birthday = birthday
      updatedHook.data.gender = gender
      updatedHook.data.verified = verified
      updatedHook.data.currency = currency
      updatedHook.data.devices = devices
      updatedHook.data.locale = locale
      updatedHook.data.timezone = timezone
      updatedHook.data.context = context
      updatedHook.data.email = email
      updatedHook.data.firstname = first_name
      updatedHook.data.lastname = last_name
      updatedHook.data.facebookLink = link
    } else {
      updatedHook.data = {}
      updatedHook.data.provider = 'facebook'
      updatedHook.data.facebookId = id
      updatedHook.data.birthday = birthday
      updatedHook.data.gender = gender
      updatedHook.data.verified = verified
      updatedHook.data.currency = currency
      updatedHook.data.devices = devices
      updatedHook.data.locale = locale
      updatedHook.data.timezone = timezone
      updatedHook.data.context = context
      updatedHook.data.facebookLink = link
    }
  }

  return updatedHook
}

export default customizeProviderData
