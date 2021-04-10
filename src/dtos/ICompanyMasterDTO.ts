import IUserDTO from './IUserDTO';

export default interface ICompanyMasterDTO {
  id: string;
  masterUser: IUserDTO;
  company: IUserDTO;
  email: string;
}
