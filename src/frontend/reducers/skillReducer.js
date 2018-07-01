import * as types from '../constants/ActionTypes'

const initialState = {
  skills: null,
  skillsIsFetching: false,
}

const skillReducer = (state = initialState, action) => {
  switch (action.type) {
  case types.SET_SKILLS: {
    return { ...state, skills: [...action.payload] }
  }

  case types.SET_SKILLS_IS_FETCHING: {
    return { ...state, skillsIsFetching: action.payload }
  }

  case types.ADD_SKILL: {
    return { ...state, skills: [...state.skills, action.payload] }
  }

  default:
    return state
  }
}

export default skillReducer
