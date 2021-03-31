import IUserDTO from './IUserDTO';

export default interface IUserFileDTO {
  id: string;
  user: IUserDTO;
  file_name: string;
  url: string;
  file_url: string;
}
