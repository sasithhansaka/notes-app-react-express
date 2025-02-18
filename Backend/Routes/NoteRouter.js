import express from "express";

import { createNote,selectNotes,deletenote } from "../Controller/NoteController.js";
import authMiddleware from "../MIddlewear/AuthMiddlwear.js";

const NoteRouter = express.Router();

NoteRouter.post("/add-note",authMiddleware,createNote);

NoteRouter.post("/get-notes",authMiddleware,selectNotes);

NoteRouter.delete("/delete-note",authMiddleware,deletenote);

export default NoteRouter;