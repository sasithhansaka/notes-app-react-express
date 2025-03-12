import express from "express";

import { createNote,selectNotes,deletenote } from "../Controller/Note.controller.js";
// import authMiddleware from "../MIddlewear/AuthMiddlwear.js";

const NoteRouter = express.Router();

NoteRouter.post("/add-note",createNote);

NoteRouter.post("/get-notes",selectNotes);

NoteRouter.delete("/delete-note",deletenote);

export default NoteRouter;