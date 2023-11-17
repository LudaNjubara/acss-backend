import { faker, Faker, hr } from '@faker-js/faker';

const fakerHr = new Faker({ locale: [hr] });

const prodGen = (subCatCount, prodMinCount, prodMaxCount) => {
  const products = [];
  let productsTotal = 0;
  for(let i=1; i<=subCatCount; i++) {
    const productsCount = faker.number.int({ min: prodMinCount, max: prodMaxCount });
    for(let j=1; j<=productsCount; j++) {
      productsTotal++;
      const pn1 = faker.string.alpha({ length: 2, casing: 'upper'});
      const pn2 = faker.string.numeric(4);
      const pn3 = faker.string.numeric(2);
      const product = { 
        id: productsTotal,
        guid: faker.string.uuid(),
        name: faker.commerce.productName(),
        productNumber: `${pn1}-${pn2}-${pn3}`,
        color: faker.color.human(),
        subCategoryId: i
      };
      products.push(product);
    }
  }

  return products;
}

export { prodGen }