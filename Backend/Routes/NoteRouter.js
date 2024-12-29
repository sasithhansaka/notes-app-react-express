import express from "express";

import { createNote,selectNotes } from "../Controller/NoteController.js";


const NoteRouter = express.Router();

NoteRouter.post("/add-note",createNote);

NoteRouter.get("/get-notes",selectNotes)

export default NoteRouter;