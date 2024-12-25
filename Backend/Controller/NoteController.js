import Note from "../Modles/Note_model.js";
import asyncHandler from "express-async-handler";
import jwt from "jsonwebtoken";
import bcrypt, { hash } from "bcrypt";
import dotenv from "dotenv";

const createNote= asyncHandler (async (req,res)=>{
    const {title,content,tag}= req.body;

    if(!title || !content ){
        res.status(404);
        throw new Error("All fields are required");
    }

    try {
        const newNote = await Note.create({
            title,
            content,
            tag: tag || [] 
        });

        if (newNote) {
            res.status(201).json({
                success: true,
                message: "Note created successfully",
                data: newNote
            });
        } else {
            res.status(500);
            throw new Error("Failed to create note");
        }
    }
     catch (error) {
        res.status(500);
        throw new Error(error.message || "An unexpected error occurred");
    }
})

const updateNote =asyncHandler(async(req,res)=>{
    const Noteid=req.params.Noteid;
    
})

export {createNote}