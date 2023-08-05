import * as Yup from 'yup';
import { Note } from '../models/noteModel';

export const validateNote = (note: Note) => {
  const schema = Yup.object().shape({
    id: Yup.number(),
    name: Yup.string(),
    createdAt: Yup.string(),
    content: Yup.string(),
    category: Yup.string().oneOf(['Task', 'Random Thought', 'Idea']),
    datesMentioned: Yup.array().of(Yup.string()),
    archived: Yup.boolean(),
  });

  schema.validateSync(note);
};

export const validateId = (id: string) => {
  const schema = Yup.string().required();
  schema.validateSync(id);
};
