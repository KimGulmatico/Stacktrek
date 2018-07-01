import * as types from '../constants/ActionTypes'
import { arePropsAvailable } from '../util'

export const initialState = {
  user: null,
  isProfileComplete: false,
  isAuthenticating: false,
  isNetworkConnectionsFetching: false,
  networkConnections: undefined,
  networkSuggestions: undefined,
  requestsReceived: undefined,
  requestsReceivedLength: undefined,
}

export const filterRequests = (requests, filter) => requests.filter((request) => {
  if (filter === 'connections') {
    return request.type === 'CONNECT_USER'
  } else if (filter === 'attestations') {
    return request.type === 'ATTEST_SKILL'
  } else if (!filter) {
    return request
  } else if (filter === 'none') {
    return null
  }
})

export const userReducer = (state = initialState, action) => {
  switch (action.type) {
  case types.USER_AUTHENTICATE_SUCCESS: {
    const user = action.payload
    const isProfileComplete = arePropsAvailable(user, ['firstname', 'middlename', 'lastname', 'email', 'school', 'contactNumber'])
    return {
      ...state, user, isProfileComplete,
    }
  }

  case types.USER_PROFILE_UPDATE: {
    const newUser = { ...state.user, ...action.payload }
    const isProfileComplete = arePropsAvailable(newUser, ['firstname', 'middlename', 'lastname', 'email', 'school', 'contactNumber'])
    return {
      ...state, user: newUser, isProfileComplete,
    }
  }

  case types.USER_SET_ACHIEVEMENTS_FROM_STACKLEAGUE: {
    return { ...state, stackleagueAchievements: action.payload }
  }

  case types.USER_IS_AUTHENTICATING:
    return { ...state, isAuthenticating: action.payload }

  case types.USER_AUTHENTICATE_FAIL:
  case types.USER_LOGOUT:
    return { ...state, user: null }

  case types.USER_CONNECTION_SUGGESTIONS_ADD:
    return { ...state, networkSuggestions: action.payload ? action.payload : [] }

  case types.USER_CONNECTIONS_ADD:
    return { ...state, networkConnections: action.payload ? action.payload : [] }

  case types.USER_CONNECTIONS_ADD_FETCHING:
    return { ...state, isNetworkConnectionsFetching: action.payload }

  case types.USER_REQUESTS_RECEIVED_ADD:
    return { ...state, requestsReceived: filterRequests(action.payload, action.filter) }

  case types.USER_REQUESTS_RECEIVED_LENGTH_ADD:
    return { ...state, requestsReceivedLength: action.payload }

  case types.USER_NEW_REQUEST_RECEIVED_ADD: {
    const newLength = state.requestsReceived ? state.requestsReceivedLength + 1 : 1
    return {
      ...state,
      requestsReceived: state.requestsReceived instanceof Array ?
        [...state.requestsReceived, action.payload] : [action.payload],
      requestsReceivedLength: newLength,
    }
  }

  case types.USER_NEW_REQUESTED_USER_ADD:
    return {
      ...state,
      user: {
        ...state.user,
        requestedUsers: (state.user && state.user.requestedUsers instanceof Array) ?
          [...state.user.requestedUsers, action.payload] : [action.payload],
      },
    }

  case types.USER_REMOVE_REQUEST: {
    const newRequests = state.requestsReceived && state.requestsReceived.filter(o => o._id.toString() !== action.requestId.toString())
    const newLength = state.requestsReceivedLength - 1
    return { ...state, requestsReceived: newRequests, requestsReceivedLength: newLength }
  }

  case types.USER_REMOVE_CONNECTION_LOCALLY: {
    const newConnections = state.networkConnections.filter(o => o._id.toString() !== action.userId.toString())
    return { ...state, networkConnections: newConnections }
  }

  case types.USER_CONNECT_ETHEREUM_ACCOUNT_SUCCESS: {
    return { ...state, user: { ...state.user, ethAddress: action.payload } }
  }

  default:
    return state
  }
}

export default userReducer
