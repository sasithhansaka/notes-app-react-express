import express from "express";
import db_connection from "./Config/db_connection.js";
import cookieParser from "cookie-parser";
import errorHandler from "./MIddlewear/erorrhandler.js";

import UserRouter from "./Routes/userRouter.js";
import NoteRouter from "./Routes/NoteRouter.js";
import emailRoutes from "./Routes/EmailRouter.js";

import dotenv from "dotenv";
// import cors from "cors";

const app = express();
// const port = 5002;

app.use(express.json());
app.use(cookieParser());

// dotenv.config();
// app.use(express.json());

// db_connection();

// app.use(errorHandler);

app.use("/api/users", UserRouter);
app.use("/api/Notes", NoteRouter);
app.use("/api/emails", emailRoutes);

app.get("/", (req, res) => {
  res.send("API is running...");
});


app.use(errorHandler);

const startServer = async () => {
  try {
    await connectDB();
    console.log("Connected to MongoDB");

    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error("MongoDB connection failed:", error);
    process.exit(1);
  }
};

startServer();

export default app;
