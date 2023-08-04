import express from 'express';
import { notesService } from '../services/notesService';
import { validateNote, validateId } from '../helpers/validation';
import { Note } from '../models/noteModel';

const router = express.Router();

router.post('/notes', async (req: express.Request, res: express.Response) => {
  try {
    const { name = 'New note', content = '', category = 'Task', datesMentioned = [], archived = false } = req.body;
    const note: Note = {
      name,
      createdAt: new Date().toISOString(),
      content,
      category,
      datesMentioned,
      archived,
    };
    validateNote(note);
    const createdNote = await notesService.createNote(note);
    res.json(createdNote);
  } catch (error) {
    res.status(400).json({ error });
  }
});

router.delete('/notes/:id', async (req: express.Request, res: express.Response) => {
  try {
    const id = req.params.id.toString();
    validateId(id);
    const deletedNote = await notesService.deleteNoteById(id);
    if (deletedNote === null) {
      res.status(404).json({ error: 'Note not found' });
    } else {
      res.json(deletedNote);
    }
  } catch (error) {
    if (error.message === 'Note not found') {
      res.status(404).json({ error: 'Note not found' });
    } else {
      res.status(400).json({ error: error.message });
    }
  }
});

router.patch('/notes/:id', async (req: express.Request, res: express.Response) => {
  try {
    const id = req.params.id.toString();
    const updatedNote = req.body as Note;
    validateId(id);
    validateNote(updatedNote);
    const updatedNoteResult = await notesService.updateNoteById(id, updatedNote);
    res.json(updatedNoteResult);
  } catch (error) {
    res.status(400).json({ error });
  }
});

router.get('/notes/stats', async (req: express.Request, res: express.Response) => {
  try {
    const totalNotes = await notesService.getAggregatedStats();
    res.json(totalNotes);
  } catch (error) {
    res.status(500).json({ error: 'Failed to get stats' });
  }
});

router.get('/notes/:id', async (req: express.Request, res: express.Response) => {
  try {
    const id = req.params.id.toString();
    validateId(id);
    const note = await notesService.getNoteById(id);
    if (note === null) {
      res.status(404).json({ error: 'Note not found' });
    } else {
      res.json(note);
    }
  } catch (error) {
    res.status(400).json({ error });
  }
});

router.get('/notes', async (req: express.Request, res: express.Response) => {
  const notes = await notesService.getAllNotes();
  res.json(notes);
});



export default router;
