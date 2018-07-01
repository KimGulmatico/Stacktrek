const addRecipientAddress = () => (hook) => {
  if (hook.type !== 'before') {
    throw new Error(addRecipientAddress.name, 'addRecipientAddress should be used as a before hook')
  }

  if (hook.data.type === 'ATTEST_SKILL' || hook.data.type === 'ATTEST_EXPERIENCE') {
    const { params: { user } } = hook

    if (!user) {
      throw new Error('There is no user entity on ', addRecipientAddress.name)
    }

    if (!user.ethAddress) {
      throw new Error('User does not have an ethAddress ', addRecipientAddress.name)
    }

    hook.data.endorseeEthAddress = user.ethAddress
    return hook
  }
}

export default addRecipientAddress
