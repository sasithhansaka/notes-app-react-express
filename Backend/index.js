import express from "express";
import db_connection from "./Config/db_connection.js";
import errorHandler from "./MIddlewear/erorrhandler.js";
import Userrouter from "./Routes/userRouter.js";
import dotenv from "dotenv";
import cors from "cors"; 

const app = express();
const port = 5002;

app.use(cors());

dotenv.config();
app.use(express.json());

db_connection();

app.use("/api/users", Userrouter);
app.use(errorHandler);

// app.use((err, req, res, next) => {
//   const statusCode = res.statusCode === 200 ? 500 : res.statusCode; // Default to 500 for server errors
//   res.status(statusCode).json({
//     message: err.message,
//     stack: process.env.NODE_ENV === "production" ? null : err.stack, // Hide stack trace in production
//   });
// });


console.log("I am pro in express");
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
