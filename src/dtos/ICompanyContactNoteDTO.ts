export default interface ICompanyContactNoteDTO {
  id: string;
  company_contact_id: string;
  note: string;
  isNew: boolean;
  created_at: Date;
  upated_at: Date;
}
