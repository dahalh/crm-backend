import { verifyAccessJWT } from "../helpers/jwtHelper.js";
import { getUser } from "../models/user/User.model.js";
import { getSession } from "../models/session/Session.model.js";

export const userAuth = async (req, res, next) => {
  try {
    // get the accessjwt from header
    const { authorization } = req.headers;
    if (authorization) {
      // check if it is valid and not expired
      const decoded = verifyAccessJWT(authorization);

      if (decoded === "jwt expired") {
        return res.status(403).json({
          status: "error",
          message: "jwt expired!",
        });
      }

      if (decoded?.email) {
        // check if it exists in database
        const existinDb = await getSession({
          type: "jwt",
          token: authorization,
        });
        if (existinDb?.id) {
          const user = await getUser({ email: decoded.email });

          if (user?.id) {
            req.userInfo = user;
            return next();
          }
        }
      }
    }
    res.status(401).json({
      status: "error",
      message: "Unauthorised!",
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};
