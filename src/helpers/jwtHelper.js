import jwt from "jsonwebtoken";
import { updateUser } from "../models/user/User.model.js";

export const createAccessJWT = async (payload) => {
  const accessJWT = jwt.sign({ payload }, process.env.JWT_ACCESS_SECRET, {
    expiresIn: "15m",
  });

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
  // const accessJWT = await createAccessJWT(payload);
  // const refreshJWT = await createRefreshJWT(payload);
  // return { accessJWT, refreshJWT };
  return {
    accessJWT: await createAccessJWT(payload),
    refreshJWT: await createRefreshJWT(payload),
  };
};
