export default interface IComercialCardResultsDTO {
  id: string;
  card_id: string;
  note: string;
  contract_value: number;
  isSuccessful: boolean;
  created_at: Date;
  updated_at: Date;
}
