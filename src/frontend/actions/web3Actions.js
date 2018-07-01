import * as types from '../constants/ActionTypes'
import store from '../store'
import getContract from '../util/getContract'

export const initializeWeb3 = (payload, hasMetamask) => ({
  type: types.WEB3_INITIALIZED,
  payload,
  hasMetamask,
})

export const initializeWeb3Error = error => ({
  type: types.WEB3_INITIALIZED_ERROR,
  payload: error,
})

export const initializeContract = payload => ({
  type: types.CONTRACT_INITIALIZED,
  payload,
})

export const connectToContract = () => async (dispatch) => {
  const { web3 } = store.getState().web3

  if (typeof web3 !== 'undefined') {
    try {
      const contract = await getContract(web3)
      dispatch(initializeContract(contract))
    } catch (e) {
      dispatch(initializeWeb3Error(e))
    }
  } else {
    dispatch(initializeWeb3Error(new Error('Web3 is undefined')))
  }
}
