import { fetchFromStackleague, shuffleArray } from '../util'
import * as types from '../constants/ActionTypes'

export const addTopPerformers = performers => ({
  type: types.TOP_PERFORMERS_ADD,
  payload: performers,
})

export const addTopSchools = ({

})

export const fetchTopPerformers = (count = 4) => async (dispatch) => {
  try {
    const proxor1s = await fetchFromStackleague('https://api.stacktrek.com/stacktrek/classes/_User?where={"proxorRating": 1}&limit=10', 'GET')
    const proxor2s = await fetchFromStackleague('https://api.stacktrek.com/stacktrek/classes/_User?where={"proxorRating": 2}&limit=10', 'GET')

    if (proxor1s.results.length > count) {
      const shuffledProxor1s = shuffleArray(proxor1s.results).slice(0, count)
      return dispatch(addTopPerformers(shuffledProxor1s))
    }

    const remainingDevCount = count - proxor1s.results.length
    const shuffledProxor2 = shuffleArray(proxor2s.results).slice(0, remainingDevCount)
    const topPerformers = proxor1s.results.concat(shuffledProxor2)
    return dispatch(addTopPerformers(topPerformers))
  } catch (e) {
    console.log(e)
  }
}
