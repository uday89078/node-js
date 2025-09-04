const Note = require('../Model/notes.model');


const notesController = {
  test: (req, res) => {
    res.send("Notes test route working");
  },

  getAllNotes: async (req, res) => {
    try {
      const notes = await Note.find({ userId: req.user.id }); // auth middleware se user milta
      res.status(200).json(notes);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Server error" });
    }
  },

  create: async (req, res) => {
    try {
      const { title, content } = req.body;
      if (!title || !content) {
        return res.status(400).json({ message: "Title and content required" });
      }

      const newNote = new Note({
        userId: req.user.id,
        title,
        content
      });

      await newNote.save();
      res.status(201).json({ message: "Note created successfully", note: newNote });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Server error" });
    }
  }
};

module.exports = notesController;
