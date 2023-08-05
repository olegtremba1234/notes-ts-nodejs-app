import express from 'express';
import { notesService } from '../services/notesService';
import { validateNote, validateId } from '../helpers/validation';
import { Note } from '../models/noteModel';
import dateParser from '../helpers/dateParser';
import controllerExceptionWrapper from '../middlewares/controllerExceptionWrapper';

import {
  createNote,
  deleteNoteById,
  updateNoteById,
  getAggregatedStats,
  getNoteById,
  getAllNotes,
} from '../controllers/notesController';

controllerExceptionWrapper

const router = express.Router();

router.post('/notes', controllerExceptionWrapper(createNote))

router.delete('/notes/:id', controllerExceptionWrapper(deleteNoteById))

router.patch('/notes/:id', controllerExceptionWrapper(updateNoteById))

router.get('/notes/stats', controllerExceptionWrapper(getAggregatedStats))

router.get('/notes/:id',controllerExceptionWrapper(getNoteById));

router.get('/notes', controllerExceptionWrapper(getAllNotes))



export default router;
