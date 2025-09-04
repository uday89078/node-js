const express = require("express");
const notesController = require("../Controller/notes.controller");
const checkIsAuth = require("../middleware/auth");

const NotesRouter = express.Router();

// Test route
NotesRouter.get("/test", notesController.test);

// Get all notes (protected)
NotesRouter.get("/", checkIsAuth, notesController.getAllNotes);

// Create note (protected)
NotesRouter.post("/create", checkIsAuth, notesController.create);

module.exports = NotesRouter;
