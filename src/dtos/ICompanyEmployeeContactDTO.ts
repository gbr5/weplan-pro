import ICompanyContactDTO from './ICompanyContactDTO';
import IEmployeeDTO from './IEmployeeDTO';

export default interface ICompanyEmployeeContactDTO {
  id: string;
  employee: IEmployeeDTO;
  companyContact: ICompanyContactDTO;
}
