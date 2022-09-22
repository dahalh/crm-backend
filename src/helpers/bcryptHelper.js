import bcrypt from "bcryptjs";

const saltRounds = 10;

export const hashPassword = (pass) => {
  return bcrypt.hashSync(pass, saltRounds);
};

export const comparePassword = (pass, hashPass) => {
  return bcrypt.compareSync(pass, hashPass);
};
