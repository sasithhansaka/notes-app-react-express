import express from "express";
import connectDB from "./Config/db_connection.js";
import cookieParser from "cookie-parser";
import errorHandler from "./MIddlewear/erorrhandler.middlewear.js";
import dotenv from 'dotenv';
import cors from 'cors';


import UserRouter from "./Routes/user.routes.js";
import NoteRouter from "./Routes/note.routes.js";
import emailRoutes from "./Routes/email.routes.js";
const app = express();
const corsOptions = {
  origin: "http://localhost:5175",
  credentials: true,
  methods: "GET, POST, PUT, DELETE, OPTIONS",
  allowedHeaders: "Content-Type, Authorization",
};

app.use(cors(corsOptions));

app.options("*", cors(corsOptions));

dotenv.config();
app.use(express.json());
app.use(cookieParser());

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
