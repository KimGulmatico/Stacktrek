import * as types from '../constants/ActionTypes'

const initialState = {
  schools: [],
  devs: [],
}

const performerReducer = (state = initialState, action) => {
  switch (action.type) {
  case types.TOP_PERFORMERS_ADD:
    return {
      ...state, devs: [...action.payload],
    }

  default:
    return state
  }
}

export default performerReducer
