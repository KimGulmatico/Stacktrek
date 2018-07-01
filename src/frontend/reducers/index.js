import userReducer from './userReducer'
import groupReducer from './groupReducer'
import eventReducer from './eventReducer'
import performerReducer from './performerReducer'
import addressReducer from './address'
import skillReducer from './skillReducer'
import web3Reducer from './web3Reducer'
import experienceReducer from './experienceReducer'

const reducer = {
  user: userReducer,
  group: groupReducer,
  event: eventReducer,
  performer: performerReducer,
  adrs: addressReducer,
  skills: skillReducer,
  web3: web3Reducer,
  experiences: experienceReducer,
}

export default reducer

