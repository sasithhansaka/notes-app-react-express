import express from "express";

import { createNote,selectNotes,deletenote } from "../Controller/Note.controller.js";
import {authenticateUser} from "../MIddlewear/auth.middlwear.js";
// import authMiddleware from "../MIddlewear/AuthMiddlwear.js";

const NoteRouter = express.Router();

NoteRouter.post("/add-note",authenticateUser, createNote);

NoteRouter.get("/get-notes",authenticateUser,selectNotes);

NoteRouter.delete("/delete-note",authenticateUser,deletenote);


export default NoteRouter;