import UserSchema from "./User.schema.js";

export const insertUser = (userObj) => {
  return UserSchema(userObj).save();
};

export const getAllUsers = (filter) => {
  return UserSchema.findOne(filter);
};

export const getUser = (filter) => {
  return UserSchema.findById(filter);
};

export const updateUser = (filter, obj) => {
  return UserSchema.findOneAndUpdate(filter, obj, { new: true });
};
