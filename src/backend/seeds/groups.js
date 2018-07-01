import faker from 'faker'
import 'babel-polyfill'
// import initializeServer from '../app';
import client from '../client'

// let app = '';
let groupService = ''

function getType() {
  const types = ['company', 'school', 'personal']
  return types[Math.floor(Math.random() * 2)]
}

async function seedGroups() {
  const type = getType()
  let privacy
  if (type === 'school' || type === 'company') {
    privacy = true
  } else {
    privacy = i % 2 === 0
  }
  for (let i = 0; i < 50; i++) {
    const group = {
      name: faker.company.companyName(),
      isPrivate: privacy,
      type,
      members: [
        faker.random.uuid(),
        faker.random.uuid(),
        faker.random.uuid(),
        faker.random.uuid(),
        faker.random.uuid(),
      ], // Array of user IDs
    }

    try {
      await groupService.create(group)
      console.log('ok')
    } catch (err) {
      console.log(err)
    }
  }
}


(async () => {
  // app = initializeServer();
  groupService = await client.service('api/groups')
  try {
    await seedGroups()
    console.log('SUCCESS, BUDDEH')
  } catch (error) {
    console.log(error)
  }
  process.exit(0)
})()
