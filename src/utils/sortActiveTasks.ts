import ITaskDTO from '../dtos/ITaskDTO';

export const sortActiveTasks = (tasks: ITaskDTO[]): ITaskDTO[] => {
  const activeTasks = tasks.filter(task => task.isActive === true);
  return activeTasks;
};
