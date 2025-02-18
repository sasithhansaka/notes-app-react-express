import mongoose from "mongoose";

const NoteSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Please enter a title"],
      maxlength: [25, "Title cannot exceed 100 characters"],
    },
    content: {
      type: String,
      required: [true, "Please enter content"],
    },
    isPinned: {
      type: Boolean,
      default: false,
    },
    userId: {
      type: String,
      required: [true],
    },
    createdOn: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

const Note = mongoose.model("Note", NoteSchema);

export default Note;