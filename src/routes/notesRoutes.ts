import express from 'express';
import { notesService } from '../services/notesService';
import { validateNote, validateId } from '../helpers/validation';
import { Note } from '../models/note';
import { notes } from '../services/notesService';

const router = express.Router();

router.post('/api/notes', (req: express.Request, res: express.Response) => {
  try {
    const { name = 'Note'+Number(notes.length + 1), content = '', category = 'Task', datesMentioned = [], archived = false } = req.body;
    const note: Note = {
      id: Date.now(),
      name,
      createdAt: new Date().toISOString(),
      content,
      category,
      datesMentioned,
      archived,
    };
    validateNote(note);
    const createdNote = notesService.createNote(note);
    res.json(createdNote);
  } catch (error) {
    res.status(400).json({ error });
  }
});

router.delete('/api/notes/:id', (req: express.Request, res: express.Response) => {
  try {
    const id = parseInt(req.params.id, 10);
    validateId(id);
    const deletedNote = notesService.deleteNoteById(id);
    res.json(deletedNote);
  } catch (error) {
    if (error.message === 'Note not found') {
      res.status(404).json({ error: 'Note not found' });
    } else {
      res.status(400).json({ error: error.message });
    }
  }
});

router.patch('/api/notes/:id', (req: express.Request, res: express.Response) => {
  try {
    const id = parseInt(req.params.id, 10);
    const updatedNote = req.body as Note;
    validateId(id);
    validateNote(updatedNote);
    const updatedNoteResult = notesService.updateNoteById(id, updatedNote);
    res.json(updatedNoteResult);
  } catch (error) {
    res.status(400).json({ error });
  }
});

router.get('/api/notes/:id', (req: express.Request, res: express.Response) => {
  try {
    const id = parseInt(req.params.id, 10);
    validateId(id);
    const note = notesService.getNoteById(id);
    if (note === null) {
      res.status(404).json({ error: 'Note not found' });
    } else {
      res.json(note);
    }
  } catch (error) {
    res.status(400).json({ error });
  }
});

router.get('/api/notes', (req: express.Request, res: express.Response) => {
  const notes = notesService.getAllNotes();
  res.json(notes);
});

router.get('/api/notes/stats', (req: express.Request, res: express.Response) => {
  const stats = notesService.getAggregatedStats();
  res.json(stats);
});

export default router;
