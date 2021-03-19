import IFormFieldDTO from './IFormFieldDTO';

export default interface IFormDTO {
  id: string;
  slug: string;
  name: string;
  title: string;
  message: string;
  isActive: boolean;
  fields: IFormFieldDTO[];
}
