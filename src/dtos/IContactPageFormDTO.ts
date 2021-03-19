import IFormDTO from './IFormDTO';

export default interface IContactPageFormDTO {
  id: string;
  isActive: boolean;
  form: IFormDTO;
}
