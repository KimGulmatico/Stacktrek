import contract from 'truffle-contract'
import stacktrekContract from '../../../build/contracts/StacktrekCV.json'

const getContract = async (web3) => {
  const stacktrek = contract(stacktrekContract)
  stacktrek.setProvider(web3.currentProvider)
  return stacktrek.deployed()
}

export default getContract
