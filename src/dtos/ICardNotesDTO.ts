export default interface ICardNotesDTO {
  id: string;
  user_id: string;
  card_unique_name: string;
  note: string;
  created_at: Date;
  updated_at: Date;
}
