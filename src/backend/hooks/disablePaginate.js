const disablePaginate = () => (hook) => {
  if ((hook.params.query && hook.params.query.$text) ||
    hook.params.query.$limit === '-1'
  ) {
    hook.params.paginate = false
    delete hook.params.query.$limit
  }
}

export default disablePaginate
