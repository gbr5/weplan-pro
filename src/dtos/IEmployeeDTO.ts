import { IEmployeeFileDTO } from './IEmployeeFileDTO';
import IUserConfirmationDTO from './IUserConfirmationDTO';
import IUserDTO from './IUserDTO';

export default interface IEmployeeDTO {
  id: string;
  email: string;
  position: string;
  employeeUser: IUserDTO;
  company: IUserDTO;
  files: IEmployeeFileDTO[];
  confirmations: IUserConfirmationDTO[];
  isActive: boolean;
}
