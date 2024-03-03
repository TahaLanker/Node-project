const User = require("../model/user");
const Role = require("../model/role");

const add = (payload) => {
  const user = new User(payload);
  return user.save();
};

const get = (payload) => {
  return User.findOne({ email: payload.email }, { __v: 0 });
};

const getRole = (roleId) => {
  return Role.findOne({ id: roleId });
};

module.exports = {
  add,
  get,
  getRole,
};
