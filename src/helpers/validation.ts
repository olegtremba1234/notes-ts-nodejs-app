import * as Yup from 'yup';
import { Note } from '../models/note';

export const validateNote = (note: Note) => {
  const schema = Yup.object().shape({
    id: Yup.number(),
    name: Yup.string().required(),
    createdAt: Yup.string(),
    content: Yup.string(),
    category: Yup.string().oneOf(['Task', 'Random Thought', 'Idea']).required(),
    datesMentioned: Yup.array().of(Yup.string()),
    archived: Yup.boolean(),
  });

  schema.validateSync(note);
};

export const validateId = (id: number) => {
  const schema = Yup.string().required();
  schema.validateSync(id);
};
