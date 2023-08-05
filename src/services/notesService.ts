import mongoose from 'mongoose';
import NoteModel, { Note, NoteCategory } from '../models/noteModel';
import { validateNote, validateId } from '../helpers/validation';

class NotesService {
  async getAllNotes(): Promise<Note[]> {
    return NoteModel.find().exec();
  }

  async getNoteById(id: string): Promise<Note | null> {
    try {
      const noteId = new mongoose.Types.ObjectId(id); // Convert string ID to ObjectId
      const note = await NoteModel.findById(noteId);
      return note;
    } catch (error) {
      console.error('Error getting note by ID:', error);
      return null;
    }
  }

  async createNote(note: Note): Promise<Note> {
    await validateNote(note);
    return NoteModel.create({ ...note, archived: false });
  }

  async updateNoteById(id: string, updatedNote: Note): Promise<Note | null> {
    await validateId(id);
    await validateNote(updatedNote);
  try {
    const noteId = new mongoose.Types.ObjectId(id);
    return NoteModel.findByIdAndUpdate(noteId, updatedNote, { new: true }).exec();
  } catch (error) {
    console.error('Error updating note by ID:', error);
    return null;
  }
}

  async deleteNoteById(id: string): Promise<Note | null> {
    const noteId = new mongoose.Types.ObjectId(id);
    return await NoteModel.findOneAndDelete(noteId).exec();
  }

  async getAggregatedStats(): Promise<{ [category: string]: {totalActive: number; totalArchived: number } }> {
  try {
    const aggregatedStats = await NoteModel.aggregate([
      {
        $group: {
          _id: '$category',
          totalActive: { $sum: { $cond: ['$archived', 0, 1] } },
          totalArchived: { $sum: { $cond: ['$archived', 1, 0] } },
        },
      },
    ]).exec();

    const statsByCategory: { [category: string]: {totalActive: number; totalArchived: number } } = {};
    aggregatedStats.forEach((categoryStats: any) => {
      const category = categoryStats._id as NoteCategory;
      statsByCategory[category] = {
        totalActive: categoryStats.totalActive,
        totalArchived: categoryStats.totalArchived,
      };
    });

    return statsByCategory;
  } catch (error) {
    console.error('Error getting aggregated stats:', error);
    return {};
  }
}
}

export const notesService = new NotesService();
