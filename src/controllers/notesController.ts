import { Request, Response } from "express";
import { notesService } from "../services/notesService";
import { Note } from "../models/noteModel";
import { validateNote } from "../helpers/validation";

export const createNote = async (
  req: Request,
  res: Response
): Promise<void> => {
  const {
    name = "New note",
    content = "",
    category = "Task",
    datesMentioned = [],
    archived = false,
  } = req.body;
  const note: Note = {
    name,
    createdAt: new Date(Date.now()),
    content,
    category,
    datesMentioned,
    archived,
  };
  validateNote(note);
  const createdNote = await notesService.createNote(note);
  res.json(createdNote);
};

export const deleteNoteById = async (
  req: Request,
  res: Response
): Promise<void> => {
  const id = req.params.id.toString();
  const deletedNote = await notesService.deleteNoteById(id);
  if (deletedNote === null) {
    res.status(404).json({ error: "Note not found!" });
  } else {
    res.json({ message: "Note deleted successfully" });
  }
};

export const updateNoteById = async (
  req: Request,
  res: Response
): Promise<void> => {
  const id = req.params.id.toString();
  const note = req.body as Note;
  const updatedNote = await notesService.updateNoteById(id, note);
  if (updatedNote === null) {
    res.status(404).json({ error: "Note not found!" });
  } else {
    res.json(updatedNote);
  }
};

export const getAggregatedStats = async (
  req: Request,
  res: Response
): Promise<void> => {
  const totalNotes = await notesService.getAggregatedStats();
  res.json(totalNotes);
};

export const getNoteById = async (
  req: Request,
  res: Response
): Promise<void> => {
  const id = req.params.id.toString();
  const note = await notesService.getNoteById(id);
  if (note === null) {
    res.status(404).json({ error: "Note not found" });
  } else {
    res.json(note);
  }
};

export const getAllNotes = async (
  req: Request,
  res: Response
): Promise<void> => {
  const notes = await notesService.getAllNotes();
  res.json(notes);
};
