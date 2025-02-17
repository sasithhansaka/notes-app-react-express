import express from "express";
import db_connection from "./Config/db_connection.js";
import errorHandler from "./MIddlewear/erorrhandler.js";
import Userrouter from "./Routes/userRouter.js";
import NoteRouter from "./Routes/NoteRouter.js";
import dotenv from "dotenv";
import cors from "cors";
import emailRoutes from "./Routes/EmailRouter.js";

const app = express();
const port = 5002;

app.use(cors());

dotenv.config();
app.use(express.json());

db_connection();

app.use(errorHandler);

app.use("/api/users", Userrouter);
app.use("/api/Notes", NoteRouter);
app.use("/api/emails", emailRoutes);

console.log("I am pro in express");
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
