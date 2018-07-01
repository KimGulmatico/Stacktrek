import * as types from '../constants/ActionTypes'

const initialState = {
  web3: null,
  contract: null,
  hasMetamask: null,
}

const web3Reducer = (state = initialState, action) => {
  switch (action.type) {
  case types.WEB3_INITIALIZED:
    return {
      ...state,
      web3: action.payload.web3,
      hasMetamask: action.hasMetamask,
    }

  case types.WEB3_INITIALIZED_ERROR:
    return {
      ...state,
      web3Error: action.payload,
    }

  case types.CONTRACT_INITIALIZED:
    return {
      ...state,
      contract: action.payload,
    }

  default:
    return state
  }
}

export default web3Reducer
