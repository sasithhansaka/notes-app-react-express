import Note from "../Modles/Note_model.js";
import asyncHandler from "express-async-handler";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

// Make sure to load environment variables
dotenv.config();

const createNote = asyncHandler(async (req, res) => {
  const { title, content } = req.body;

  // Ensure title and content are provided
  if (!title || !content) {
    res.status(400); // Bad Request
    throw new Error("All fields are required");
  }

  try {
    // Extract token from Authorization header
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      res.status(401); // Unauthorized
      throw new Error("No token, authorization denied");
    }

    // Decode the token and extract user information
    const decoded = jwt.verify(token, process.env.ACCESTOKN);
    const userId = decoded.user.id;

    // Create a new note with the userId
    const newNote = await Note.create({
      title,
      content,
      userid: userId, // Associate the note with the userId
    });

    // Respond with success if note creation is successful
    if (newNote) {
      res.status(201).json({
        success: true,
        message: "Note created successfully",
        data: newNote,
      });
    } else {
      res.status(500);
      throw new Error("Failed to create note");
    }
  } catch (error) {
    console.error("Error creating note:", error);  // Log error for debugging
    res.status(500);
    throw new Error(error.message || "An unexpected error occurred");
  }
});

export { createNote };
