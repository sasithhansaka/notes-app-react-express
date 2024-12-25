import mongoose from "mongoose";

const NoteSchema = mongoose.Schema(
    {
        title: {
            type: String,
            required: [true, 'Please enter a title'],
        },
        content: {
            type: String,
            required: [true, 'Please enter content'],
        },
        tags: {
            type: [String], // Array of strings
            required: [true, 'Please add at least one tag'],
        },
        isPinned: {
            type: Boolean,
            default: false, // Default value
        },
        // userid: {
        //     type: mongoose.Schema.Types.ObjectId, // Reference to the User model
        //     default: false, // Default value
        // },
    },
    {
        timestamps: true, // Automatically adds createdAt and updatedAt fields
    }
);

const Note = mongoose.model("Note", NoteSchema);

export default Note;
