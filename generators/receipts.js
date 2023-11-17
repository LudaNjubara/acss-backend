import { genGenerator } from './generic.js'
import { faker, Faker, hr } from '@faker-js/faker';

const fakerHr = new Faker({ locale: [hr] });

const rcptGen = (count, customerCount, sellersCount, creditCardsCount) => {
  const receipts = genGenerator(count).map((receipt) => {
    const hasCreditCardId = faker.number.int({ min: 1, max: 100 }) > 60 ? false : true;
    const hasSellerId = faker.number.int({ min: 1, max: 100 }) > 90 ? false : true;
    const obj = { 
      date: faker.date.past({ years: 5 }),
      billNumber: `${faker.string.alpha({ length: 2, casing: 'upper' })}${faker.number.int({ min: 10000000, max: 99999999 })}`,
      customerId: faker.number.int({ min: 1, max: customerCount }),
      sellerId: hasSellerId ? faker.number.int({ min: 1, max: sellersCount }) : null,
      creditCardId: hasCreditCardId ? faker.number.int({ min: 1, max: creditCardsCount }) : null,
      comment: faker.lorem.lines({ min: 1, max: 1 })
    };
    return {...receipt, ...obj};
  });

  return receipts;
}

export { rcptGen }