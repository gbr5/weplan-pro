import ICompanyContactDTO from './ICompanyContactDTO';
import ICustomerServiceOrderFieldAnswerDTO from './ICustomerServiceOrderFieldAnswerDTO';

export default interface ICustomerServiceOrderDTO {
  id: string;
  customer_id: string;
  customer: ICompanyContactDTO;
  title: string;
  message: string;
  isResponded: boolean;
  defaultFieldAnswers: ICustomerServiceOrderFieldAnswerDTO[];
}
