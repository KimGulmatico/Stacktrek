import * as types from '../constants/ActionTypes'

const initialState = {
  experiences: [],
}

const experienceReducer = (state = initialState, action) => {
  switch (action.type) {
  case types.ADD_EXPERIENCE: {
    return { ...state, experiences: [...state.experiences, action.payload] }
  }

  case types.SET_EXPERIENCES: {
    return { ...state, experiences: [...action.payload] }
  }
  default:
    return state
  }
}

export default experienceReducer
