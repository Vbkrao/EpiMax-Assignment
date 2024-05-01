import express from "express";
import cors from "cors";
import { notesModel } from "./models/notes";

const app = express();

app.use(express.json());
app.use(cors());

app.get("/notes", async (req, res) => {
  const notes = await notesModel.find({}).exec();
  res.json(notes);
});

app.post("/notes", async (req, res) => {
  const { content, title } = req.body;

  let checkTitleUniqueness = await notesModel.findOne({ title: title }).exec();

  if (!content || !title) {
    return res.status(400).json({
      error: "Missing content or title",
    });
  } else if (checkTitleUniqueness) {
    return res.status(400).json({
      error: "Title must be unique",
    });
  }

  const newNote = new notesModel({
    title: title,
    content: content,
  });
  let note = await newNote.save();

  res.json(note);
});

app.get("/notes/:id", async (req, res) => {
  const id = req.params.id;
  let notes;

  try {
    notes = await notesModel.findById(id).exec();
  } catch (e) {
    return res.status(404).json({
      error: "Note not found",
    });
  }

  res.json(notes);
});

app.put("/notes/:id", async (req, res) => {
  const id = req.params.id;
  const { title, content } = req.body;

  let newNote;

  try {
    newNote = await notesModel.findByIdAndUpdate(id, { title, content }).exec();
  } catch (e) {
    return res.status(404).json({
      error:
        "Note not found or title must be unique or missing content or title",
    });
  }

  res.json(newNote);
});

app.delete("/notes/:id", async (req, res) => {
  const id = req.params.id;
  let x;

  try {
    x = await notesModel.findByIdAndDelete(id).exec();
  } catch (e) {
    return res.status(400).json({
      error: "Error Deleting Note",
    });
  }

  res.json(x);
});

export { app };
