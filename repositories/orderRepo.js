const Order = require("../model/order");
const Category = require("../model/categories");

const get = (page, size) => {
  const recorsToSkip = (page - 1) * size;
  return Order.find({}).skip(recorsToSkip).limit(size).sort({createdAt:-1});
};
const add = (payload) => {
  const order = new Order(payload);
  return order.save();
};

module.exports = {
  get,
  add,
};
