import ICompanyContactInfoDTO from './ICompanyContactInfoDTO';
import ICompanyContactNoteDTO from './ICompanyContactNoteDTO';

export default interface ICompanyContactDTO {
  id: string;
  name: string;
  family_name: string;
  description: string;
  company_contact_type: string;
  weplanUser: boolean;
  isCompany: boolean;
  isNew: boolean;
  contact_infos: ICompanyContactInfoDTO[];
  notes: ICompanyContactNoteDTO[];
}
