import IFormEmailNotificationDTO from './IFormEmailNotificationDTO';
import IFormFieldDTO from './IFormFieldDTO';
import IFormLandingPageDTO from './IFormLandingPageDTO';
import IFormStylesDTO from './IFormStylesDTO';
import IFormSuccessMessageDTO from './IFormSuccessMessageDTO';

export default interface IFormDTO {
  id: string;
  user_id: string;
  slug: string;
  name: string;
  title: string;
  message: string;
  isActive: boolean;
  fields: IFormFieldDTO[];
  emailNotifications: IFormEmailNotificationDTO[];
  styles: IFormStylesDTO;
  successMessage: IFormSuccessMessageDTO;
  landingPage: IFormLandingPageDTO;
}
