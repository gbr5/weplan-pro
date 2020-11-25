import ITaskDTO from './ITaskDTO';

export default interface ICheckListDTO {
  id: string;
  name: string;
  color: string;
  isActive: boolean;
  priority: string;
  due_date: string;
  tasks: ITaskDTO[];
}
