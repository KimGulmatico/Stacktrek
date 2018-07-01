import { fetchFromStackleague } from '../util'
import * as types from '../constants/ActionTypes'

export const addEvents = events => ({
  type: types.EVENTS_ADD_SUCCESS,
  payload: events,
})

export const fetchEvents = () => async (dispatch) => {
  try {
    const eventSchedules = await fetchFromStackleague('https://api.stacktrek.com/stacktrek/classes/EventSchedule', 'GET')
    const events = await fetchFromStackleague('https://api.stacktrek.com/stacktrek/classes/Event', 'GET')
    const populatedEventSchedules = eventSchedules.results.map((eventSched) => {
      const matchedEvent = events.results.filter(event => event.objectId === eventSched.Event.objectId)[0]
      const updatedEvent = { ...eventSched, Event: matchedEvent }
      return updatedEvent
    })
    return dispatch(addEvents(populatedEventSchedules))
  } catch (e) {
    console.log(e)
  }
}
