import { OrderBuilder } from "../builders/OrderBuilder.js";

export function buildOrder(values = {}) {
  return new OrderBuilder()
    .with(values)
    .build();
}

export function buildMultipleOrders(count, values = {}) {
  return Array.from(
    { length: count },
    () => new OrderBuilder()
      .with(values)
      .build()
  );
}

export function buildOrdersFrom(data) {
  return data.map(order =>
    new OrderBuilder()
      .with(order)
      .build()
  );
}