import deepFreeze from 'deep-freeze'
import * as types from '../../src/frontend/constants/ActionTypes'
import { userReducer, initialState } from '../../src/frontend/reducers/userReducer'

describe('userReducer', () => {
  it('Returns the default state when action is not defined', () => {
    const action = { type: 'NOT_A_VALID_ACTION' }
    deepFreeze(initialState)
    assert.equal(userReducer(initialState, action), initialState)
  })

  it('Returns the correct state with user when action is USER_AUTHENTICATE_SUCCESS', () => {
    const action = {
      type: types.USER_AUTHENTICATE_SUCCESS,
      payload: {
        firstname: 'Li Arolf',
        lastname: 'Rey',
      },
    }
    const expectedState = {
      ...initialState,
      user: action.payload,
    }
    deepFreeze(initialState)
    assert.deepEqual(userReducer(initialState, action), expectedState)
  })

  it('Returns the correct state when action is USER_SET_ACHIEVEMENTS_FROM_STACKLEAGUE', () => {
    const action = {
      type: types.USER_SET_ACHIEVEMENTS_FROM_STACKLEAGUE,
      payload: [{ level: 'Proxor 1' }, { level: 'Proxor 1' }],
    }
    const expectedState = {
      ...initialState,
      stackleagueAchievements: action.payload,
    }
    deepFreeze(initialState)
    assert.deepEqual(userReducer(initialState, action), expectedState)
  })

  it('Returns the correct state when the action is USER_IS_AUTHENTICATING', () => {
    const action = {
      type: types.USER_IS_AUTHENTICATING,
      payload: true,
    }
    const expectedState = {
      ...initialState,
      isAuthenticating: true,
    }
    deepFreeze(initialState)
    assert.deepEqual(userReducer(initialState, action), expectedState)
  })

  it('Returns the correct state when the action is USER_AUTHENTICATE_FAIL', () => {
    const action = {
      type: types.USER_AUTHENTICATE_FAIL,
    }
    const expectedState = {
      ...initialState,
      user: null,
    }
    deepFreeze(initialState)
    assert.deepEqual(userReducer(initialState, action), expectedState)
  })

  it('Returns the correct state when the action is USER_LOGOUT', () => {
    const action = {
      type: types.USER_LOGOUT,
    }
    const expectedState = {
      ...initialState,
      user: null,
    }
    deepFreeze(initialState)
    assert.deepEqual(userReducer(initialState, action), expectedState)
  })

  it('Returns the correct state when the action is USER_CONNECTION_SUGGESTIONS_ADD', () => {
    const action = {
      type: types.USER_CONNECTION_SUGGESTIONS_ADD,
      payload: [{ name: 'Some guy' }, { name: 'Potato' }],
    }
    const expectedState = {
      ...initialState,
      networkSuggestions: action.payload,
    }
    deepFreeze(initialState)
    assert.deepEqual(userReducer(initialState, action), expectedState)
  })


  it('Returns the correct state when the action is USER_CONNECTIONS_ADD', () => {
    const action = {
      type: types.USER_CONNECTIONS_ADD,
      payload: [{ name: 'potato lord' }, { name: 'some guy' }],
    }
    const expectedState = {
      ...initialState,
      networkConnections: action.payload,
    }
    deepFreeze(initialState)
    assert.deepEqual(userReducer(initialState, action), expectedState)
  })

  it('Returns the correct state when the action is USER_REQUESTS_RECEIVED_ADD', () => {
    const action = {
      type: types.USER_REQUESTS_RECEIVED_ADD,
      payload: [{ from: 'one guy' }, { from: 'second guy' }],
    }
    const expectedState = {
      ...initialState,
      requestsReceived: action.payload,
    }
    deepFreeze(initialState)
    assert.deepEqual(userReducer(initialState, action), expectedState)
  })

  it('Returns the correct state when the action is USER_REQUESTS_RECIVED_LENGTH_ADD', () => {
    const action = {
      type: types.USER_REQUESTS_RECEIVED_LENGTH_ADD,
      payload: 2323,
    }
    const expectedState = {
      ...initialState,
      requestsReceivedLength: 2323,
    }
    deepFreeze(initialState)
    assert.deepEqual(userReducer(initialState, action), expectedState)
  })

  it('Returns the correct state when the action is USER_NEW_REQUEST_RECEIVED_ADD', () => {
    const action = {
      type: types.USER_NEW_REQUEST_RECEIVED_ADD,
      payload: {
        hello: 'xx',
      },
    }
    const expectedState = {
      ...initialState,
      requestsReceived: [action.payload],
      requestsReceivedLength: 1,
    }
    deepFreeze(initialState)
    assert.deepEqual(userReducer(initialState, action), expectedState)
  })

  it('Returns the correct state when the action is USER_NEW_REQUESTED_USER_ADD', () => {
    const action = {
      type: types.USER_NEW_REQUESTED_USER_ADD,
      payload: {
        name: 'my name is john',
      },
    }
    const expectedState = {
      ...initialState,
      user: { ...initialState.user, requestedUsers: [action.payload] },
    }
    deepFreeze(initialState)
    assert.deepEqual(userReducer(initialState, action), expectedState)
  })

  it('Returns the correct state when the action is USER_REMOVE_REQUEST', () => {
    const state = {
      ...initialState,
      requestsReceivedLength: 2,
      requestsReceived: [{ _id: '111' }, { _id: '112' }, { _id: '113' }, { _id: '123' }],
    }
    const action = {
      type: types.USER_REMOVE_REQUEST,
      requestId: '123',
    }
    const expectedState = {
      ...initialState,
      requestsReceivedLength: 1,
      requestsReceived: [{ _id: '111' }, { _id: '112' }, { _id: '113' }],
    }
    deepFreeze(state)
    assert.deepEqual(userReducer(state, action), expectedState)
  })

  it('Returns the correct state when the action is USER_REMOVE_CONNECTION_LOCALLY', () => {
    const state = {
      ...initialState,
      networkConnections: [{ _id: '111' }, { _id: '112' }, { _id: '113' }],
    }
    const action = {
      type: types.USER_REMOVE_CONNECTION_LOCALLY,
      userId: '112',
    }
    const expectedState = {
      ...initialState,
      networkConnections: [{ _id: '111' }, { _id: '113' }],
    }
    deepFreeze(state)
    assert.deepEqual(userReducer(state, action), expectedState)
  })

  it('Returns the correct state when the action is USER_CONNECT_ETHEREUM_ACCOUNT_SUCCESS', () => {
    const state = {
      ...initialState,
      user: {
        name: 'some guy',
      },
    }
    const action = {
      type: types.USER_CONNECT_ETHEREUM_ACCOUNT_SUCCESS,
      payload: '213213021i39ikasjdsakldj21903i',
    }
    const expectedState = {
      ...initialState,
      user: {
        ...state.user,
        ethAddress: action.payload,
      },
    }
    deepFreeze(state)
    assert.deepEqual(userReducer(state, action), expectedState)
  })
})
