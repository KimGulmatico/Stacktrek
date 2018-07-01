const initialState = {}

const address = (state = initialState, action) => {
  switch (action.type) {
  case 'setadrs':
    return { state, ...action.payload }

  default:
    return state
  }
}

export default address
