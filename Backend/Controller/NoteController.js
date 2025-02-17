import Note from "../Modles/Note_model.js";
import asyncHandler from "express-async-handler";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

const selectNotes = asyncHandler(async (req, res, next) => {
  const { userId } = req.body;

  try {
    const notes = await Note.find({ userId });

    if (!notes || notes.length === 0) {
      res.status(400).json({
        success: false,
        message: "No note found",
      });
    }

    res.status(200).json({
      success: true,
      message: "notes retrived",
      data: notes,
    });
  } catch (err) {
    next(err);
  }
});

const createNote = asyncHandler(async (req, res, next) => {
  const { title, content, userId } = req.body;

  if (!title || !content || !userId) {
    res.status(400).json({
      success: false,
      message: "All fields required",
    });
  }

  try {
    const newNote = await Note.create({
      title,
      content,
      userId,
    });

    if (newNote) {
      res.status(200).json({
        success: true,
        message: "note created successfully",
        data: newNote,
      });
    } else {
      res.status(500).json({
        success: false,
        message: "server error",
      });
    }
  } catch (err) {
    next(err);
  }
});

const deletenote = asyncHandler(async (req, res, next) => {
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
        message: "No note found for this user for delete",
      });
    }

    await note.deleteOne();

    res.status(200).json({
      success: true,
      message: "Note deleted",
    });
  } catch (err) {
    next(err);
  }
});

export { selectNotes, createNote, deletenote };