export default interface INoteDTO {
  id: string;
  author_id: string;
  note: string;
  isNew: boolean;
  created_at: Date;
  updated_at: Date;
}
