import "dotenv/config";
import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";

const app = express();

const PORT = process.env.PORT || 8000;

app.use(cors());
app.use(express.json());
app.use(morgan("dev"));
app.use(helmet());

// database connection
import { dbConnect } from "./config/dbConnect.js";
dbConnect();

// routers
import userRouter from "./src/routers/userRouter.js";
import ticketRouter from "./src/routers/ticketRouter.js";
app.use("/v1/user", userRouter);
app.use("/v1/ticket", ticketRouter);

app.get("/", (req, res) => {
  res.json({
    message: "you have reached the admin api",
  });
});

// error handling
app.use((err, req, res, next) => {
  console.log(err);
  res.status(err.status || 500);
  res.json({
    status: "error",
    message: err.message,
  });
});

app.listen(PORT, (error) => {
  error && console.log(error);
  console.log(`Server is running on port: ${PORT}`);
});
