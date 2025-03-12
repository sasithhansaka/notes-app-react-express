import Note from "../Modles/Note_model.js";
import HttpStatus from "../constants/HttpStatus.js";

const selectNotes = async (req, res, next) => {
  const { userId } = req.body;

  try {
    const notes = await Note.find({ userId });

    if (!notes || notes.length === 0) {
      res.status(HttpStatus.BAD_REQUEST).json({
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
  const{userId}=req.body;
  const { ...Notedata } = req.body;

  try {
    const newNote = await Note.create({
      ...Notedata,
      userId,
    });

    if(!newNote){
      res.status(HttpStatus.BAD_REQUEST).json({
        success: false,
        message: "Note not created",
      })
    }

    res.status(HttpStatus.CREATED).json({
      success: true,
      message: "Note created",
      data: newNote,
    });

  } catch (err) {
    next(err);
  }
};

const deletenote = async (req, res, next) => {
  const { userId } = req.user._id;
  const { noteId } = req.body;

  try {
    const note = await Note.find({ _id: noteId, userId });

    if (!note) {
      res.status(HttpStatus.NOT_FOUND).json({
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

export { selectNotes, createNote, deletenote };