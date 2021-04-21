import INoteDTO from './INoteDTO';

export default interface ITaskNoteDTO {
  id: string;
  task_id: string;
  note: INoteDTO;
  created_at: Date;
  updated_at: Date;
}
