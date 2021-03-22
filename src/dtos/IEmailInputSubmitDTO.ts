export default interface IEmailInputSubmitDTO {
  sending_type: 'to' | 'cc' | 'cco';
  email: string;
}
