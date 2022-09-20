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

app.use((err, req, res, next) => {
  console.log(err);
  res.status(err.status || 400);
  res.json({
    status: "error",
    message: err.message,
  });
});

app.listen(PORT, (error) => {
  error && console.log(error);
  console.log(`Server is running on port: ${PORT}`);
});
