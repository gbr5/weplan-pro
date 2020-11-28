import IUserDTO from './IUserDTO';

export default interface ICardParticipantDTO {
  id: string;
  employee: IUserDTO;
  isActive: boolean;
}
