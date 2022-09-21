import express from "express";
import { insertUser } from "../models/user/User.model.js";

const router = express.Router();

router.all("/", (req, res, next) => {
  //   res.json({
  //     message: "return from user router",
  //   });
  next();
});

router.post("/", async (req, res, next) => {
  try {
    const result = await insertUser(req.body);
    console.log(result);

    res.json({
      message: "New user created.",
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
