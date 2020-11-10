export default interface ITasks {
  id: string;
  check_list_id: string;
  task: string;
  color: string;
  isActive: boolean;
  priority: string;
  status: string;
  due_date: string;
  created_at: Date;
  updated_at: Date;
}
