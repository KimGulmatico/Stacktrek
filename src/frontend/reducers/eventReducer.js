import * as types from '../constants/ActionTypes'

const initialState = []

const eventReducer = (state = initialState, action) => {
  switch (action.type) {
  case types.EVENTS_ADD_SUCCESS:
    return [...action.payload]

  default:
    return state
  }
}

export default eventReducer
