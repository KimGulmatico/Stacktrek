// checks if object properties are truthy
export const arePropsAvailable = (data, properties) => {
  let isPropsAvail = true

  for (let i = 0; i < properties.length; i += 1) {
    if (!data[properties[i]]) {
      isPropsAvail = false
      break
    }
  }

  return isPropsAvail
}

export const fetchFromStackleague = async (url, method) => {
  const res = await fetch(url, {
    method,
    headers: {
      'X-Parse-Application-Id': 'StacktrekAppIdO77BgjN1nx',
    },
  })
  const toJson = await res.json()
  return toJson
}

/**
 * Fetch skills from list-of-programming-languages
 */
export const fetchSkillList = async () => {
  const res = await fetch('https://raw.githubusercontent.com/scienceai/list-of-programming-languages/master/data/data.json', { method: 'GET' })
  let skills = await res.json()
  skills = skills.itemListElement.map(skill => skill.item.name)
  return skills
}

/**
* Randomize array element order in-place.
* Using Durstenfeld shuffle algorithm.
*/
export const shuffleArray = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    const temp = array[i]
    array[i] = array[j]
    array[j] = temp
  }
  return array
}
