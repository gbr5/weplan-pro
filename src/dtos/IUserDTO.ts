import ICompanyInfoDTO from './ICompanyInfoDTO';
import IPersonInfoDTO from './IPersonInfoDTO';

export default interface IUserDTO {
  id: string;
  name: string;
  email: string;
  trimmed_name: string;
  avatar_url: string;
  companyInfo: ICompanyInfoDTO;
  personInfo: IPersonInfoDTO;
}
