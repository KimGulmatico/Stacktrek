const groupReducer = (state = {}, action) => {
  switch (action.type) {
  case 'SET_CURRENT_GROUP':
    return Object.assign({}, state, {
      currentGroup: action.payload,
    })
  default:
    break
  }

  return state
}

export default groupReducer
