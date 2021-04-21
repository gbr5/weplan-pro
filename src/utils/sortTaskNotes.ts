import { differenceInMilliseconds } from 'date-fns';
import ITaskNoteDTO from '../dtos/ITaskNoteDTO';

export const sortTaskNotes = (taskNotes: ITaskNoteDTO[]): ITaskNoteDTO[] => {
  const sortedNotes = taskNotes.sort((a, b) => {
    if (
      differenceInMilliseconds(new Date(a.created_at), new Date(b.created_at)) <
      1
    ) {
      return 1;
    }

    if (
      differenceInMilliseconds(new Date(a.created_at), new Date(b.created_at)) >
      1
    ) {
      return -1;
    }
    return 0;
  });
  return sortedNotes;
};
