import IUserDTO from './IUserDTO';

export default interface IUserEmployeeDTO {
  id: string;
  employee: IUserDTO;
  isActive: boolean;
}
