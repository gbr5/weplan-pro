import ICustomerServiceOrderFieldDTO from './ICustomerServiceOrderFieldDTO';

export default interface ICustomerServiceOrderFieldAnswerDTO {
  id: string;
  companyDefaultServiceOrderField: ICustomerServiceOrderFieldDTO;
  answer: string;
}
