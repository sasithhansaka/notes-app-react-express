import Note from "../Modles/Note_model.js";
import HttpStatus from "../constants/HttpStatus.js";

const selectNotes = async (req, res, next) => {
  // const { userId } = req.body;
  const userId  = req.user._id;

  try {
    const notes = await Note.find({ userId });

    if (!notes || notes.length === 0) {
      return  res.status(HttpStatus.BAD_REQUEST).json({
        success: false,
        message: "No note found",
      });
    }

    res.status(HttpStatus.OK).json({
      success: true,
      message: "notes retrived",
      data: notes,
    });

  } catch (err) {
    next(err);
  }
};

const createNote = async (req, res, next) => {
  try {
    if (!req.user) {
      return res.status(HttpStatus.UNAUTHORIZED).json({
        success: false,
        message: "Unauthenticated user",
      });
    }

    const userId = req.user._id;
    const { ...noteData } = req.body;

    const newNote = await Note.create({
      ...noteData,
      userId,
    });

    if (!newNote) {
      return res.status(HttpStatus.BAD_REQUEST).json({
        success: false,
        message: "Note not created",
      });
    }

    return res.status(HttpStatus.CREATED).json({
      success: true,
      message: "Note created",
      data: newNote,
    });

  } catch (err) {
    next(err);
  }
};


const deleteNote = async (req, res, next) => {
  const userId = req.user._id;
  const { noteId } = req.body;

  try {
    const note = await Note.findOne({ _id: noteId, userId });

    if (!note) {
       return res.status(HttpStatus.NOT_FOUND).json({
        success: false,
        message: "No note found for this user for delete",
      });
    }

    await note.deleteOne();

    res.status(HttpStatus.OK).json({
      success: true,
      message: "Note deleted",
    });
  } catch (err) {
    next(err);
  }
};

export { selectNotes, createNote, deleteNote };