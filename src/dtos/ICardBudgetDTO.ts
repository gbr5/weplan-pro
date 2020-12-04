import ICardBudgetInstallmentDTO from './ICardBudgetInstallmentDTO';
import ICompanyContactDTO from './ICompanyContactDTO';
import IUserDTO from './IUserDTO';

export default interface ICardBudgetDTO {
  id: string;
  sales_person: IUserDTO;
  card_unique_name: string;
  customer: ICompanyContactDTO;
  value: string;
  validity_date: string;
  number_of_installments: string;
  isValid: boolean;
  created_at: Date;
  updated_at: Date;
  installments: ICardBudgetInstallmentDTO[];
}
