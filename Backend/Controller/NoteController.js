import Note from "../Modles/Note_model.js";
import asyncHandler from "express-async-handler";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";


const selectNotes = asyncHandler(async (req, res) => {
  const { userId } = req.body;

  if (!userId) {
    res.status(400);
    throw new Error("userid not found");
  }

  try {
    const notes = await Note.find({ userId });

    if (!notes || notes.length === 0) {
      res.status(404).json({
        success: false,
        message: "No notes found for this user",
      });
      return;
    }

    res.status(200).json({
      success: true,
      message: "Notes retrieved successfully",
      data: notes,
    });
  } catch (err) {
    console.error("Error fetching notes:", err);
    res.status(500).json({
      success: false,
      message: err.message || "An unexpected error occurred",
    });
  }
});

const createNote = asyncHandler(async (req, res) => {
  const { title, content, userId } = req.body;

  if (!title || !content || !userId) {
    res.status(400);
    throw new Error("All fields are required");
  }

  try {
    const newNote = await Note.create({
      title,
      content,
      userId,
    });

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
    console.error("Error creating note:", error);
    res.status(500);
    throw new Error(error.message || "An unexpected error occurred");
  }
});

const deletenote = asyncHandler(async (req, res) => {
  const { userId, noteId } = req.body;

  if (!userId || !noteId) {
    res.status(400);
    throw new Error("userid and noteid is required");
  }

  try {
    const note = await Note.findOne({ _id: noteId, userId });

    if (!note) {
      res.status(404).json({
        success: false,
        message: "Note not found or does not belong to the user",
      });
      return;
    }

    await note.deleteOne();

    res.status(200).send("note deleted succesfully");
  } catch (error) {
    console.error("Error deleting  note:", error);
    res.status(500);
    throw new Error(error.message || "An unexpected error occurred");
  }
});

export { selectNotes, createNote, deletenote };
