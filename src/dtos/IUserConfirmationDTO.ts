export default interface IUserConfirmationDTO {
  id: string;
  sender_id: string;
  receiver_id: string;
  isConfirmed: boolean;
  title: string;
  message: string;
}
