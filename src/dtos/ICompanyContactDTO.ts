import IUserDTO from './IUserDTO';

interface ICompanyContactWeplanUser {
  id: string;
  companyContactWeplanUser: IUserDTO;
}

export default interface ICompanyContactDTO {
  id: string;
  name: string;
  description: string;
  company_contact_type: string;
  weplanUser: boolean;
  isCompany: boolean;
  companyContactWeplanUser?: ICompanyContactWeplanUser;
}
