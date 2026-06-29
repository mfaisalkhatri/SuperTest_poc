import {faker} from "@faker-js/faker";

export class OrderBuilder {
  constructor(values = {}) {
    const product_amount = Number(
      faker.commerce.price({ min: 100, max: 1000 }),
    );
    const qty = faker.number.int({ min: 1, max: 5 });
    const tax_amt = faker.number.int({ min: 2, max: 10 });

    this.order = {
      user_id: this.generateUserId(),
      product_id: this.generateProductId(),
      product_name: faker.commerce.productName(),
      product_amount,
      qty,
      tax_amt,
      total_amt: 0,
    };
    this.calculateTotal();
  }

  generateUserId() {
    return faker.number.int({ min: 1, max: 50 }).toString();
  }

  generateProductId() {
    return faker.number.int({ min: 1, max: 100 }).toString();
  }
  calculateTotal() {
    this.order.total_amt = this.order.product_amount + this.order.tax_amt;
  }

  with(values) {
    Object.assign(this.order, values);
    this.calculateTotal();
    return this;
  }

  build() {
    return this.order;
  }
}
