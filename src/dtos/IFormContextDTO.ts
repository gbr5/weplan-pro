import ICreateFormDTO from './ICreateFormDTO';
import ICreateFormFieldDTO from './ICreateFormFieldDTO';
import IFormDTO from './IFormDTO';
import IFormFieldDTO from './IFormFieldDTO';

export default interface IFormContextDTO {
  currentForm: IFormDTO;
  userForms: IFormDTO[];
  getForm: (id: string) => void;
  getForms: () => void;
  createForm: (data: ICreateFormDTO) => void;
  createFormField: (data: ICreateFormFieldDTO) => void;
  updateForm: (data: IFormDTO) => void;
  updateFormField: (data: IFormFieldDTO) => void;
  deleteForm: (id: string) => void;
  deleteFormField: (id: string) => void;
  handleSetCurrentForm: (data: IFormDTO) => void;
}
