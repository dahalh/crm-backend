import express from "express";
import { insertUser } from "../models/user/User.model.js";
import { hashPassword, comparePassword } from "../helpers/bcryptHelper.js";

const router = express.Router();

router.all("/", (req, res, next) => {
  //   res.json({
  //     message: "return from user router",
  //   });
  next();
});

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

export default router;
