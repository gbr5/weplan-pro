import IFormEmailNotificationRecipientDTO from './IFormEmailNotificationRecipientDTO';

export default interface IFormEmailNotificationDTO {
  id: string;
  form_id: string;
  notification_type: string;
  subject: string;
  message: string;
  recipients: IFormEmailNotificationRecipientDTO[];
}
