import mongoose, { Document, Schema, ObjectId } from 'mongoose';

export interface Note {
  _id?: ObjectId;
  name: string;
  createdAt: string;
  content: string;
  category: NoteCategory;
  datesMentioned: string[];
  archived: boolean;
}

export type NoteCategory = 'Task' | 'Random Thought' | 'Idea';

const noteSchema = new Schema<Note>({
  name: { type: String, required: false },
  createdAt: { type: String, required: false },
  content: { type: String, required: false },
  category: { type: String, enum: ['Task', 'Random Thought', 'Idea'], required: false },
  datesMentioned: { type: [String], default: [] },
  archived: { type: Boolean, default: false },
});

export default mongoose.model<Note>('notes', noteSchema);