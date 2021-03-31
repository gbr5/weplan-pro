import ICompanyInfoDTO from '../hooks/ICompanyInfoDTO';
import IPersonInfoDTO from '../hooks/IPersonInfoDTO';
import IFunnelDTO from './IFunnelDTO';

export default interface IUserDTO {
  id: string;
  name: string;
  email: string;
  trimmed_name: string;
  avatar_url: string;
  supplierFunnels: IFunnelDTO[];
  companyInfo: ICompanyInfoDTO;
  personInfo: IPersonInfoDTO;
}
