export interface Note {
  id: number;
  name: string;
  createdAt: string;
  content: string;
  category: NoteCategory;
  datesMentioned: string[];
  archived: boolean;
}

export type NoteCategory = 'Task' | 'Random Thought' | 'Idea';
