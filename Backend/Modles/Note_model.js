import mongoose from "mongoose";

const {Schema,model} = mongoose;

const NoteSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, "title is required"],
      maxlength: [25, "Title cannot exceed 100 characters"],
    },
    content: {
      type: String,
      required: [true, "Please enter content"],
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
);

const NoteModel = model("Note", NoteSchema);

export default NoteModel;