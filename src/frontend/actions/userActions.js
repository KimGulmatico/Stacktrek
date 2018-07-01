import * as types from '../constants/ActionTypes'
import client from '../client'
import { fetchFromStackleague } from '../util'

export const setUser = user => ({
  type: types.USER_AUTHENTICATE_SUCCESS, payload: user,
})

export const setUserAdditionalData = payload => ({
  type: types.USER_PROFILE_UPDATE, payload,
})

export const setIsAuthenticating = isAuthenticating => ({
  type: types.USER_IS_AUTHENTICATING, payload: isAuthenticating,
})

export const setUserConnectionSuggestions = payload => ({
  type: types.USER_CONNECTION_SUGGESTIONS_ADD, payload,
})

export const setUserRequestsReceived = (payload, filter) => ({
  type: types.USER_REQUESTS_RECEIVED_ADD,
  filter,
  payload,
})

export const setUserRequestsReceivedLength = payload => ({
  type: types.USER_REQUESTS_RECEIVED_LENGTH_ADD,
  payload,
})

export const setUserConnections = payload => ({
  type: types.USER_CONNECTIONS_ADD, payload,
})

export const setUserConnectionsFetching = payload => ({
  type: types.USER_CONNECTIONS_ADD_FETCHING, payload,
})

export const removeUser = () => ({ type: types.USER_LOGOUT })
export const error = e => ({ type: types.USER_AUTHENTICATE_FAIL, error: e })

export const authenticate = () => async (dispatch) => {
  try {
    dispatch(setIsAuthenticating(true))
    const token = await client.authenticate()
    const payload = await client.passport.verifyJWT(token.accessToken)
    const user = await client.service('users').get(payload.userId)
    dispatch(setUser(user))
    dispatch(setIsAuthenticating(false))
    return user
  } catch (e) {
    dispatch(setIsAuthenticating(false))
    return dispatch(error(e))
  }
}

export const addNewRequestReceived = payload => ({
  type: types.USER_NEW_REQUEST_RECEIVED_ADD,
  payload,
})

export const addNewRequestedUser = payload => ({
  type: types.USER_NEW_REQUESTED_USER_ADD,
  payload,
})

export const removeRequest = requestId => ({
  type: types.USER_REMOVE_REQUEST,
  requestId,
})

export const removeConnectionLocally = userId => ({
  type: types.USER_REMOVE_CONNECTION_LOCALLY,
  userId,
})

export const setUserAchievementsStackleague = payload => ({
  type: types.USER_SET_ACHIEVEMENTS_FROM_STACKLEAGUE,
  payload,
})

export const ethAddressConnect = (type, payload) => ({
  type,
  payload,
})

export const logout = () => async (dispatch) => {
  try {
    await client.logout()
    return dispatch(removeUser())
  } catch (e) {
    console.log(e)
  }
}

export const updateUserData = (id, userData) => async (dispatch) => {
  try {
    if (!userData.company) {
      delete userData.company
    }
    console.log(userData)
    const res = await client.service('users').patch(id, userData)
    dispatch(setUserAdditionalData(res))
  } catch (e) {
    console.log(e)
  }
}

export const fethUserDataFromStackleague = facebookId => async (dispatch, getState) => {
  try {
    const res = await fetchFromStackleague(`https://api.stacktrek.com/stacktrek/classes/_User?where={"facebookId":"${facebookId}"}`, 'GET')
    const state = getState()
    const userFromStackleague = {
      school: res.results[0].school,
      company: res.results[0].company,
      contactNumber: res.results[0].mobileNo,
    }
    const updatedUser = { ...userFromStackleague, ...state.user.user }
    return dispatch(setUserAdditionalData(updatedUser))
  } catch (e) {
    console.log(e)
  }
}

export const fetchStackleagueAchievements = facebookId => async () => {
  try {
    const eventParticipants = (await fetchFromStackleague(
      `https://api.stacktrek.com/stacktrek/classes/EventParticipant?where={"User":{"$inQuery":{"where":{"facebookId": "${facebookId}"},"className":"_User"}}}`,
      'GET',
    )).results
    const eventScheduleIds = JSON.stringify(eventParticipants.map(e => e.EventSchedule.objectId))
    const eventSchedules = (await fetchFromStackleague(
      `https://api.stacktrek.com/stacktrek/classes/EventSchedule?where={"objectId":{"$in":${eventScheduleIds}}}`,
      'GET',
    )).results
    const eventIds = JSON.stringify(eventSchedules.map(e => e.Event.objectId))
    const events = (await fetchFromStackleague(
      `https://api.stacktrek.com/stacktrek/classes/Event?where={"objectId":{"$in":${eventIds}}}`,
      'GET',
    )).results
    const achievements = eventParticipants.map((participant) => {
      const matchedEvent = events.filter(e => e.objectId === participant.Event.objectId)[0]
      const matchedTitle = eventSchedules.filter(e => e.objectId === participant.EventSchedule.objectId)[0]
      return {
        proxorRating: participant.proxorRating,
        title: `${matchedEvent.name} ${matchedTitle.title}`,
      }
    })
    return achievements
  } catch (e) {
    console.log(e)
  }
}


export const querySuggestions = (excludeUsers, skip) => client.service('users').find({ query: { _id: { $nin: excludeUsers }, $skip: skip } })
export const queryRequestsReceived = async (userId, skip) => client.service('api/requests').find({
  query: {
    $and: [{ status: 'PENDING' },
    { recipient: userId },
    ],
    $skip: skip,
  },
})

export const getUserConnectionSuggestions = (excludeUsers, skip = 0) => async (dispatch) => {
  try {
    const suggestions = await querySuggestions(excludeUsers, skip)
    return dispatch(setUserConnectionSuggestions(suggestions.data))
  } catch (e) {
    console.log(e)
  }
}

export const getUserRequests = (userId, skip = 0, filter) => async (dispatch) => {
  try {
    const requests = await queryRequestsReceived(userId, skip)
    dispatch(setUserRequestsReceivedLength(requests.total))
    return dispatch(setUserRequestsReceived(requests.data, filter))
  } catch (e) {
    console.log(e)
  }
}

export const getUserConnections = userId => async (dispatch) => {
  try {
    dispatch(setUserConnectionsFetching(true))

    const con1 = (await client.service('api/requests')
      .find({ query: { $and: [{ status: 'APPROVED' }, { type: 'CONNECT_USER' }, { sender: userId }], $limit: '-1' } }))
      .map(req => req.recipient)
    const con2 = (await client.service('api/requests')
      .find({ query: { $and: [{ status: 'APPROVED' }, { type: 'CONNECT_USER' }, { recipient: userId }], $limit: '-1' } }))
      .map(req => req.sender)
    let connections = [...con1, ...con2]
    connections = await client.service('users').find({ query: { _id: { $in: connections } } })

    dispatch(setUserConnections(connections.data))
    dispatch(setUserConnectionsFetching(false))
  } catch (e) {
    console.log(e)
  }
}

export const sendConnectRequest = (senderId, senderName, recipientId, senderFBID, recipientFBID) =>
  async (dispatch) => {
    try {
      const requestData = {
        status: 'PENDING',
        type: 'CONNECT_USER',
        sender: senderId,
        recipient: recipientId,
        senderName,
        senderFBID,
        recipientFBID,
      }
      await client.service('api/requests').create(requestData)
      dispatch(addNewRequestedUser(recipientId))
    } catch (e) {
      return Promise.reject(e)
    }
  }

export const removeConnection = (userId, userFriendId) => async () => {
  try {
    const res = await client.service('api/requests').find({
      query: {
        $or: [
          {
            type: 'CONNECT_USER',
            status: 'APPROVED',
            sender: userId,
            recipient: userFriendId,
          },
          {
            type: 'CONNECT_USER',
            status: 'APPROVED',
            sender: userFriendId,
            recipient: userId,
          },
        ],
      },
    })
    const requestId = res.data[0]._id
    return client.service('api/requests').remove(requestId)
  } catch (e) {
    console.log(e)
  }
}

export const approveConnection = requestId => async (dispatch) => {
  try {
    await client.service('api/requests').update(requestId, { $set: { status: 'APPROVED' } })
    dispatch(removeRequest(requestId))
  } catch (e) {
    console.log(e)
  }
}

export const rejectConnection = requestId => async (dispatch) => {
  try {
    await client.service('api/requests').remove(requestId)
    dispatch(removeRequest(requestId))
  } catch (e) {
    console.log(e)
  }
}

export const attestSkill = requestId => async (dispatch) => {
  try {
    await client.service('api/requests').update(requestId, { $set: { status: 'APPROVED' } })
    dispatch(removeRequest(requestId))
  } catch (e) {
    console.log(e)
  }
}

export const getFBId = userId => async () => {
  try {
    const user = await client.service('users').get(userId)
    return user.facebookId
  } catch (e) {
    console.log(e)
  }
}

export const getUserData = userId => async () => {
  try {
    const user = await client.service('users').get(userId)
    return user
  } catch (e) {
    console.log(e)
  }
}
export const getUserDataFromFB = facebookId => async () => {
  try {
    const user = await client.service('users').find({ query: { facebookId } })
    return user.data[0]
  } catch (e) {
    console.log(e)
  }
}

export const connectEthAccount = (userId, address) => async (dispatch) => {
  try {
    dispatch(ethAddressConnect(types.USER_CONNECT_ETHEREUM_ACCOUNT_FETCHING, true))
    await client.service('users').patch(userId, { ethAddress: address })
    dispatch(ethAddressConnect(types.USER_CONNECT_ETHEREUM_ACCOUNT_SUCCESS, address))
    return dispatch(ethAddressConnect(types.USER_CONNECT_ETHEREUM_ACCOUNT_FETCHING, false))
  } catch (e) {
    dispatch(ethAddressConnect(types.USER_CONNECT_ETHEREUM_ACCOUNT_FAIL), e)
    return dispatch(ethAddressConnect(types.USER_CONNECT_ETHEREUM_ACCOUNT_FETCHING, false))
  }
}
