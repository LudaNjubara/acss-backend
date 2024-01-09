import { faker, Faker, hr } from "@faker-js/faker";

const fakerHr = new Faker({ locale: [hr] });

const itemGen = (receiptCount, productCount, itemMinCount, itemMaxCount, qtyMinCount, qtyMaxCount) => {
  const items = [];
  let itemsTotal = 0;
  for (let i = 1; i <= receiptCount; i++) {
    const itemCount = faker.number.int({ min: itemMinCount, max: itemMaxCount });
    for (let j = 1; j <= itemCount; j++) {
      itemsTotal++;
      const item = {
        id: itemsTotal,
        guid: faker.string.uuid(),
        billId: i,
        quantity: faker.number.int({ min: qtyMinCount, max: qtyMaxCount }),
        productId: faker.number.int({ min: 1, max: productCount + 1 }),
        totalPrice: fakerHr.commerce.price(),
      };
      items.push(item);
    }
  }

  return items;
};

export { itemGen };
