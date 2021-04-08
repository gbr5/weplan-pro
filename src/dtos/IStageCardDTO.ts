export default interface IStageCardDTO {
  id: string;
  stage_id: string;
  name: string;
  unique_name: string;
  isActive: boolean;
  card_owner: string;
  weplanEvent: boolean;
  updated_at: Date;
  created_at: Date;
}
