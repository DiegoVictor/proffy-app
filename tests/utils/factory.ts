import { faker } from '@faker-js/faker';
import { factory } from 'factory-girl';

factory.define(
  'Teacher',
  {},
  {
    id: faker.number.int,
    name: faker.person.fullName,
    subject: faker.lorem.word,
    bio: faker.lorem.paragraph,
    cost: () => Number(faker.finance.amount()),
    avatar: faker.image.url,
    whatsapp: faker.phone.number,
  },
);

export { factory };
