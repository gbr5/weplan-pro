import { differenceInMilliseconds } from 'date-fns';
import INoteDTO from '../dtos/INoteDTO';

export const sortNotes = (notes: INoteDTO[]): INoteDTO[] => {
  const sortedNotes = notes.sort((a, b) => {
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
