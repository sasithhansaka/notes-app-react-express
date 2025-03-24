import express from "express";

import { createNote,selectNotes,deleteNote } from "../Controller/Note.controller.js";
import {authenticateUser} from "../MIddlewear/auth.middlwear.js";
// import authMiddleware from "../MIddlewear/AuthMiddlwear.js";

const NoteRouter = express.Router();


/**
 * @swagger
 * tags:
 *   name: Notes
 *   description: API for managing user notes
 */

/**
 * @swagger
 * /notes/add-note:
 *   post:
 *     summary: Create a new note
 *     tags: [Notes]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 example: "My First Note"
 *               content:
 *                 type: string
 *                 example: "This is the content of my note."
 *     responses:
 *       201:
 *         description: Note created successfully
 *       400:
 *         description: Validation error
 *       401:
 *         description: Unauthorized
 */
NoteRouter.post("/add-note", authenticateUser, createNote);

/**
 * @swagger
 * /notes/get-notes:
 *   get:
 *     summary: Retrieve all notes for the authenticated user
 *     tags: [Notes]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of user notes
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                     example: "660d9af10e3f8e1234567890"
 *                   title:
 *                     type: string
 *                     example: "My First Note"
 *                   content:
 *                     type: string
 *                     example: "This is the content of my note."
 *                   createdOn:
 *                     type: string
 *                     format: date-time
 *                     example: "2025-03-24T12:34:56.789Z"
 *       401:
 *         description: Unauthorized
 */
NoteRouter.get("/get-notes", authenticateUser, selectNotes);

/**
 * @swagger
 * /notes/delete-note/{id}:
 *   delete:
 *     summary: Delete a specific note
 *     tags: [Notes]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the note to delete
 *     responses:
 *       200:
 *         description: Note deleted successfully
 *       404:
 *         description: Note not found
 *       401:
 *         description: Unauthorized
 */
NoteRouter.delete("/delete-note/:id", authenticateUser, deleteNote); 



export default NoteRouter;