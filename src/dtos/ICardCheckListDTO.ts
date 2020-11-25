import ICheckListDTO from './ICheckListDTO';

export default interface ICardCheckListDTO {
  id: string;
  card_id: string;
  check_list_id: string;
  card_unique_name: string;
  created_at: Date;
  updated_at: Date;
  check_list: ICheckListDTO;
}
