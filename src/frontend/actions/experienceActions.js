import client from '../client'
import * as types from '../constants/ActionTypes'

const addExperience = payload => ({
  type: types.ADD_EXPERIENCE,
  payload,
})

const setExperiences = payload => ({
  type: types.SET_EXPERIENCES,
  payload,
})

export const createExperience = experience => async (dispatch) => {
  try {
    const newExperience = await client.service('api/experiences').create(experience)
    dispatch(addExperience(newExperience))
  } catch (e) {
    console.log(e)
  }
}

export const getExperiences = ownerId => async (dispatch) => {
  try {
    const experiences = await client.service('api/experiences').find({
      query: {
        ownerId,
        $limit: '-1',
      },
    })
    dispatch(setExperiences(experiences))
    return experiences
  } catch (e) {
    console.log(e)
  }
}
