import express from "express";
import { getAllUsers, insertUser } from "../models/user/User.model.js";
import { hashPassword, comparePassword } from "../helpers/bcryptHelper.js";
import {
  createAccessJWT,
  createRefreshJWT,
  createJWTS,
} from "../helpers/jwtHelper.js";

const router = express.Router();

router.all("/", (req, res, next) => {
  //   res.json({
  //     message: "return from user router",
  //   });
  next();
});

// register user
router.post("/", async (req, res, next) => {
  try {
    const hashPass = hashPassword(req.body.password);
    req.body.password = hashPass;
    const result = await insertUser(req.body);
    console.log(result);

    result?._id
      ? res.json({
          status: "success",
          message: "New user created successfully.",
          result,
        })
      : res.json({
          message: "error",
          message:
            "Error creating new user. Please try again later or contact the admin.",
          result,
        });
  } catch (error) {
    error.status = 500;
    if (error.message.includes("E11000 duplicate key error")) {
      error.message = "User already exists using this email.";
    }
    next(error);
  }
});

// login user
router.post("/login", async (req, res, next) => {
  try {
    console.log(req.body);
    const { email, password } = req.body;

    const user = await getAllUsers({ email });
    // console.log(user);

    if (user?._id) {
      const isMatched = comparePassword(password, user.password);

      if (isMatched) {
        user.password = undefined;

        const accessJWT = await createAccessJWT(user.email);

        const refreshJWT = await createRefreshJWT(user.email);

        res.json({
          status: "success",
          message: "User logged in successfully",
          accessJWT,
          refreshJWT,
        });
        return;
      }
    }
    res.status(401).json({
      status: "error",
      message: "Invalid login credentials",
    });
  } catch (error) {
    error.status = 500;
    next(error);
  }
});

export default router;
