import IStageCardDTO from './IStageCardDTO';

export default interface ICreateCardTaskDTO {
  check_list_id: string;
  due_date: string;
  card: IStageCardDTO;
}
