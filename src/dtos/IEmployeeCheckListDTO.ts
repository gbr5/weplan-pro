import ICheckListDTO from './ICheckListDTO';

export default interface IEmployeeCheckListDTO {
  id: string;
  employee_id: string;
  check_list: ICheckListDTO;
}
