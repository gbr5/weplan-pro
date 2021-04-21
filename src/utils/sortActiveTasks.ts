import { differenceInDays } from 'date-fns';
import ITaskDTO from '../dtos/ITaskDTO';

export const sortActiveTasks = (tasks: ITaskDTO[]): ITaskDTO[] => {
  const activeTasks = tasks.filter(task => task.isActive === true);
  const sortedTasks = activeTasks
    .sort((a, b) => {
      if (
        (a.priority === 'low' && b.priority === 'neutral') ||
        (a.priority === 'low' && b.priority === 'high') ||
        (a.priority === 'neutral' && b.priority === 'high')
      ) {
        return 1;
      }
      if (
        (a.priority === 'neutral' && b.priority === 'low') ||
        (a.priority === 'high' && b.priority === 'low') ||
        (a.priority === 'high' && b.priority === 'neutral')
      ) {
        return -1;
      }
      return 0;
    })
    .sort((a, b) => {
      if (differenceInDays(new Date(a.due_date), new Date(b.due_date)) > 1) {
        return 1;
      }

      if (differenceInDays(new Date(a.due_date), new Date(b.due_date)) > 1) {
        return -1;
      }
      return 0;
    });
  return sortedTasks;
};
