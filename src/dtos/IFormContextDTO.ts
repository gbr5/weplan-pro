import ICreateFormDTO from './ICreateFormDTO';
import ICreateFormFieldDTO from './ICreateFormFieldDTO';
import IFormDTO from './IFormDTO';
import IFormFieldDTO from './IFormFieldDTO';
import IFormStylesDTO from './IFormStylesDTO';
import IOnlyFormStylesDTO from './IOnlyFormStylesDTO';

export default interface IFormContextDTO {
  defaultFormStyles: IOnlyFormStylesDTO;
  currentForm: IFormDTO;
  userForms: IFormDTO[];
  getForm: (id: string) => void;
  getForms: () => void;
  createForm: (data: ICreateFormDTO) => Promise<IFormDTO>;
  createFormField: (data: ICreateFormFieldDTO) => Promise<IFormFieldDTO>;
  updateForm: (data: IFormDTO) => void;
  updateFormField: (data: IFormFieldDTO) => void;
  updateFormStyles: (data: IFormStylesDTO) => void;
  deleteForm: (id: string) => void;
  deleteFormField: (id: string) => void;
  handleSetCurrentForm: (data: IFormDTO) => void;
}
