import faker from 'faker';
import 'babel-polyfill';
import client from '../client';

let userService = '';

async function seedUsers() {
  for (let i = 0; i < 50; i++) {
    const user = {
      email: faker.internet.email(),
      password: faker.internet.password(),
      firstname: faker.name.firstName(),
      lastname: faker.name.lastName(),
      location: faker.address.streetAddress(),
      bio: faker.name.jobDescriptor(),
      fbId: faker.random.number(),
    };

    try {
      await userService.create(user)
    } catch (error) {
      console.log(error);
    }

  }
}


( async () => {
  userService = await client.service('users');
  try {
    await seedUsers();
  } catch (error) {
    console.log(error);  
  }
  process.exit(0);
})();
