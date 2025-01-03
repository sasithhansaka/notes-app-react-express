import express from "express";

import { createNote,selectNotes,deletenote } from "../Controller/NoteController.js";

const NoteRouter = express.Router();

NoteRouter.post("/add-note",createNote);

NoteRouter.post("/get-notes",selectNotes);

NoteRouter.delete("/delete-note",deletenote);

export default NoteRouter;