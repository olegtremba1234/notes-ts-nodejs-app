import { Note } from '../models/note';
import { validateNote, validateId } from '../helpers/validation';

export const notes: Note[] = [
  {
    id: 1,
    name: 'Grocery List',
    createdAt: '2023-07-30T10:00:00',
    content: 'Remember to buy groceries on 01/08/2023',
    category: 'Task',
    datesMentioned: ['01/08/2023'],
    archived: false,
  },
  {
    id: 2,
    name: 'Beach Day',
    createdAt: '2023-07-29T15:30:00',
    content: 'Had a great time at the beach today!',
    category: 'Random Thought',
    datesMentioned: [],
    archived: false,
  },
  {
    id: 3,
    name: 'New Project',
    createdAt: '2023-07-28T09:15:00',
    content: 'Idea: Start a new project using React and TypeScript',
    category: 'Idea',
    datesMentioned: [],
    archived: false,
  },
  {
    id: 4,
    name: 'Task Example',
    createdAt: '2023-07-27T12:00:00',
    content: 'This is another note with a name',
    category: 'Task',
    datesMentioned: [],
    archived: false,
  },
  {
    id: 5,
    name: 'Random Thought',
    createdAt: '2023-07-26T18:45:00',
    content: 'A random thought popped into my mind!',
    category: 'Random Thought',
    datesMentioned: [],
    archived: false,
  },
  {
    id: 6,
    name: 'Learning Goal',
    createdAt: '2023-07-25T11:30:00',
    content: 'Idea: Learn a new programming language',
    category: 'Idea',
    datesMentioned: [],
    archived: false,
  },
  {
    id: 7,
    name: 'Task Complete',
    createdAt: '2023-07-24T14:20:00',
    content: 'Completed a task successfully!',
    category: 'Task',
    datesMentioned: ['24/07/2023', '25/07/2023'],
    archived: false,
  },
];

class NotesService {
  getAllNotes(): Note[] {
    return notes;
  }

  getNoteById(id: number): Note | null {
    const note = notes.find((note) => note.id === id);
    return note || null;
  }

  createNote(note: Note): Note {
    validateNote(note);
    const newNote: Note = { ...note, id: Number(notes.length + 1), archived: false };
    notes.push(newNote);
    return newNote;
  }

  updateNoteById(id: number, updatedNote: Note): Note | undefined {
    validateId(id);
    validateNote(updatedNote);
    const index = notes.findIndex((note) => note.id === id);
    if (index !== -1) {
      notes[index] = { ...notes[index], ...updatedNote, id };
      return notes[index];
    }
    return undefined;
  }

  deleteNoteById(id: number): Note | undefined {
    validateId(id);
    const index = notes.findIndex((note) => note.id === id);
    if (index === -1) {
      throw new Error('Note not found');
    }
    const deletedNote = notes.splice(index, 1)[0];
    return deletedNote;
  }

  getAggregatedStats(): any {
    const totalNotes = notes.length;
    const totalArchived = notes.filter((note) => note.archived).length;
    return { totalNotes, totalArchived };
  }
}

export const notesService = new NotesService();
