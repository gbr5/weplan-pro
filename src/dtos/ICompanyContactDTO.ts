import ICompanyContactInfoDTO from './ICompanyContactInfoDTO';

export default interface ICompanyContactDTO {
  id: string;
  name: string;
  description: string;
  company_contact_type: string;
  weplanUser: boolean;
  isCompany: boolean;
  contact_infos: ICompanyContactInfoDTO[];
}
