import faker from 'faker';
import 'babel-polyfill';
import client from '../client';

let eventService = '';

async function seedEvents() {
  for (let i = 0; i < 50; i++) {
    const event = {
        name: faker.finance.currencyName(),
        title: faker.commerce.productName(),
        eventStart: faker.date.future(),
        eventEnd: faker.date.future(),
        location: `${faker.address.latitude()} , ${faker.address.longitude()}`,
        registrationEnd: faker.date.past(),
        // banner: faker.image.animals(),
        state: faker.address.state(),
        city: faker.address.city(),
        street: faker.address.streetAddress(),
        zipCode: faker.address.zipCode(),
        organizer: faker.company.companyName(),
        faq: faker.lorem.paragraph(),
        howToPrepare: faker.lorem.paragraph(),
        overview: faker.lorem.paragraph(),
    };

    await eventService.create(event)
      .then()
      .catch((err) => {
        console.log(`Errorcode: ${err}`);
      });
  }
}


( async () => {
  eventService = await client.service('events');
  try {
    await seedEvents();
  } catch (error) {
    console.log(error);  
  }
  process.exit(0);
})();
