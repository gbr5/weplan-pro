import ICompanyContactDTO from './ICompanyContactDTO';

export default interface ICardCustomerDTO {
  id: string;
  description: string;
  customer: ICompanyContactDTO;
}
