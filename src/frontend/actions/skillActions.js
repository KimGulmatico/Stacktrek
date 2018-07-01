import client from '../client'
import * as types from '../constants/ActionTypes'

const setSkills = payload => ({
  type: types.SET_SKILLS,
  payload,
})

const setSkillsIsFetching = payload => ({
  type: types.SET_SKILLS_IS_FETCHING,
  payload,
})

const addSkill = payload => ({
  type: types.ADD_SKILL,
  payload,
})

export const createSkill = skill => async (dispatch) => {
  try {
    const newSkill = await client.service('api/skills').create(skill)
    dispatch(addSkill(newSkill))
  } catch (e) {
    console.log(e)
  }
}

export const getSkills = ownerId => async (dispatch) => {
  try {
    dispatch(setSkillsIsFetching(true))
    const skills = await client.service('api/skills').find({ query: { ownerId } })
    dispatch(setSkills(skills))
    dispatch(setSkillsIsFetching(false))
    return skills
  } catch (e) {
    console.log(e)
  }
}

export const getEndorsers = skill => async () => {
  try {
    return client.service('api/requests').find({
      query: {
        $and: [
          { type: 'ATTEST_SKILL' },
          { status: 'APPROVED' },
          { sender: skill.ownerId },
          { 'data.name': skill.name },
        ],
        $limit: '-1',
      },
    })
  } catch (e) {
    console.log(e)
  }
}
