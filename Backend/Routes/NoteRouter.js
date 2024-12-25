import express from "express";

import { createNote } from "../Controller/NoteController.js";


const NoteRouter = express.Router();

NoteRouter.post("/add-note",createNote);

export default NoteRouter;