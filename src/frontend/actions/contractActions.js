import * as types from '../constants/ActionTypes'
import { connectEthAccount, attestSkill } from './userActions'

export const insertUser = (firstname, lastname, ethAddress) => async (dispatch, getState) => {
  try {
    const { contract, web3 } = getState().web3
    const { _id } = getState().user.user

    if (contract && web3) {
      const res = await contract.insertUser(firstname, lastname, { from: ethAddress })
      if (res && web3.toDecimal(res.receipt.status) === 1) {
        dispatch(connectEthAccount(_id, ethAddress))
      } else {
        throw new Error('No contract found')
      }
    } else {
      throw new Error('No contract found')
    }
  } catch (e) {
    throw new Error(e)
  }
}

export const endorseSkill = (endorseeAddress, skillName, requestId) =>
  async (dispatch, getState) => {
    console.log(endorseeAddress)
    try {
      const { contract, web3 } = getState().web3
      const { ethAddress } = getState().user.user

      if (contract && ethAddress && web3) {
        const res = await contract.insertUserSkill(endorseeAddress, skillName, { from: ethAddress })
        if (res && web3.toDecimal(res.receipt.status) === 1) {
          return dispatch(attestSkill(requestId))
        }
      }
      throw new Error('No contract or user address found')
    } catch (e) {
      console.log(e)
    }
  }

export const getAttestors = (ethAddress, skillName) => async (dispatch, getState) => {
  try {
    const { contract } = getState().web3

    if (contract && ethAddress) {
      const res = await contract.getUserSkillByName(ethAddress, skillName)
      return res[2]
    }
    throw new Error('No contract or user address found')
  } catch (e) {
    console.log(e)
  }
}

export const confirmExamResult = (eventIndex, examResult, ipfsHash, requestId) =>
  async (dispatch, getState) => {
    try {
      const { contract, web3 } = getState().web3
      const { ethAddress } = getState().user.user

      if (contract && ethAddress && web3) {
        const res = await contract.insertUserLeagueResult(eventIndex, examResult, ipfsHash, { from: ethAddress })
        if (res && web3.toDecimal(res.receipt.status) === 1) {
           dispatch(attestSkill(requestId))
        }
      }
      throw new Error('No contract or user address found')
    } catch (e) {
      console.log(e)
    }
  }

export const endorseExperience = (endorseeAddress, title, company, dateFrom, dateTo, requestId) =>
  async (dispatch, getState) => {
    try {
      const { contract, web3 } = getState().web3
      const { ethAddress } = getState().user.user

      if (contract && ethAddress && web3) {
        const res = await contract.insertUserExperience(endorseeAddress, title, company, dateFrom, dateTo, { from: ethAddress })
        if (res && web3.toDecimal(res.receipt.status) === 1) {
          dispatch(attestSkill(requestId))
        }
      }
      throw new Error('No contract or user address found')
    } catch (e) {
      console.log(e)
    }
  }


// Actions for the admin of Stack League

export const addLeagueEvent = (eventName, examProvider, requestId) =>
  async (dispatch, getState) => {
    try {
      const { contract, web3 } = getState().web3
      const { ethAddress } = getState().user.user

      if (contract && ethAddress && web3) {
        const res = await contract.addLeague(eventName, examProvider, { from: ethAddress })
        if (res && web3.toDecimal(res.receipt.status) === 1) {
           dispatch(attestSkill(requestId))
        }
      }
      throw new Error('No contract or user address found')
    } catch (e) {
      console.log(e)
    }
  }

export const getListLeagueEvents = requestId =>
  async (dispatch, getState) => {
    try {
      const { contract, web3 } = getState().web3
      const { ethAddress } = getState().user.user

      if (contract && ethAddress && web3) {
        const length = await contract.getLeagueLength()
        if (length) {
          for (let i = 0; i <= length - 1; i++) {
            const res = await contract.getLeague(i)
            console.log(i, res)
          }
        }
      }
      throw new Error('No contract or user address found')
    } catch (e) {
      console.log(e)
    }
  }

export const allowAdressToSaveResult = (eventIndex, addressToAllow, requestId) =>
  async (dispatch, getState) => {
    try {
      const { contract, web3 } = getState().web3
      const { ethAddress } = getState().user.user

      if (contract && ethAddress && web3) {
        const res = await contract.allowUserToInsertResult(eventIndex, addressToAllow, { from: ethAddress })
        if (res && web3.toDecimal(res.receipt.status) === 1) {
           dispatch(attestSkill(requestId))
        }
      }
      throw new Error('No contract or user address found')
    } catch (e) {
      console.log(e)
    }
  }

