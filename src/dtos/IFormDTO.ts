import IFormEmailNotificationDTO from './IFormEmailNotificationDTO';
import IFormFieldDTO from './IFormFieldDTO';
import IFormStylesDTO from './IFormStylesDTO';
import IFormSuccessMessageDTO from './IFormSuccessMessageDTO';

export default interface IFormDTO {
  id: string;
  slug: string;
  name: string;
  title: string;
  message: string;
  isActive: boolean;
  fields: IFormFieldDTO[];
  emailNotifications: IFormEmailNotificationDTO[];
  styles: IFormStylesDTO;
  successMessage: IFormSuccessMessageDTO;
}
