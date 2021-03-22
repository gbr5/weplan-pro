import ICheckBoxOptionDTO from './ICheckBoxOptionDTO';
import ICreateFormDTO from './ICreateFormDTO';
import ICreateFormEmailNotificationDTO from './ICreateFormEmailNotificationDTO';
import ICreateFormFieldDTO from './ICreateFormFieldDTO';
import IFormDTO from './IFormDTO';
import IFormEmailNotificationDTO from './IFormEmailNotificationDTO';
import IFormEmailNotificationRecipientDTO from './IFormEmailNotificationRecipientDTO';
import IFormFieldDTO from './IFormFieldDTO';
import IFormLandingPageDTO from './IFormLandingPageDTO';
import IFormStylesDTO from './IFormStylesDTO';
import IFormSuccessMessageDTO from './IFormSuccessMessageDTO';
import IOnlyFormStylesDTO from './IOnlyFormStylesDTO';

export default interface IFormContextDTO {
  fieldTypes: ICheckBoxOptionDTO[];
  defaultFormStyles: IOnlyFormStylesDTO;
  currentForm: IFormDTO;
  userForms: IFormDTO[];
  getForm: (id: string) => void;
  getForms: () => Promise<IFormDTO[]>;
  createForm: (data: ICreateFormDTO) => Promise<IFormDTO>;
  createFormField: (data: ICreateFormFieldDTO) => Promise<IFormFieldDTO>;
  createFormLandingPage: (data: Omit<IFormLandingPageDTO, 'id'>) => void;
  createFormEmailNotification: (data: ICreateFormEmailNotificationDTO) => void;
  createEmailNotificationRecipient: (
    data: Omit<IFormEmailNotificationRecipientDTO, 'id'>,
  ) => void;
  updateFormSuccessMessage: (data: IFormSuccessMessageDTO) => void;
  updateForm: (data: IFormDTO) => void;
  updateFormField: (data: IFormFieldDTO) => void;
  updateFormLandingPage: (data: IFormLandingPageDTO) => void;
  updateFormStyles: (data: IFormStylesDTO) => void;
  updateFormEmailNotification: (
    data: Omit<IFormEmailNotificationDTO, 'recipients'>,
  ) => void;
  updateFormEmailNotificationRecipient: (
    data: IFormEmailNotificationRecipientDTO,
  ) => void;
  deleteForm: (id: string) => void;
  deleteFormField: (id: string) => void;
  deleteFormEmailNotification: (
    data: Omit<IFormEmailNotificationDTO, 'recipients'>,
  ) => void;
  handleSetCurrentForm: (data: IFormDTO) => void;
}
