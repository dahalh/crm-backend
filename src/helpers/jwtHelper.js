import jwt from "jsonwebtoken";
import { updateUser } from "../models/user/User.model.js";
import { insertSession } from "../models/session/Session.model.js";

export const createAccessJWT = async (payload) => {
  const accessJWT = jwt.sign({ payload }, process.env.JWT_ACCESS_SECRET, {
    expiresIn: "15m",
  });

  const obj = {
    token: accessJWT,
    type: "jwt",
  };
  await insertSession(obj);
  return accessJWT;
};

export const createRefreshJWT = async (payload) => {
  const refreshJWT = jwt.sign({ payload }, process.env.JWT_REFRESH_SECRET, {
    expiresIn: "30d",
  });

  await updateUser({ email: payload.email }, { refreshJWT });

  return refreshJWT;
};

export const createJWTS = async (payload) => {
  return {
    accessJWT: await createAccessJWT(payload),
    refreshJWT: await createRefreshJWT(payload),
  };
};

export const verifyAccessJWT = (token) => {
  try {
    return jwt.verify(token, process.env.JWT_ACCESS_SECRET);
  } catch (error) {
    return error.message;
  }
};

export const verifyRefreshJWT = (token) => {
  try {
    return jwt.verify(token, process.env.JWT_REFRESH_SECRET);
  } catch (error) {
    return error.message;
  }
};
