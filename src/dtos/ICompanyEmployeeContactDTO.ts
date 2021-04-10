import ICompanyContactDTO from './ICompanyContactDTO';

export default interface ICompanyEmployeeContactDTO {
  id: string;
  employee_id: string;
  companyContact: ICompanyContactDTO;
}
