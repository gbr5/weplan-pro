import { ChangeEvent } from 'react';
import IContactPageCampaignDTO from './IContactPageCampaignDTO';
import IContactPageDTO from './IContactPageDTO';
import IContactPageFormDTO from './IContactPageFormDTO';
import IContactPageLinkDTO from './IContactPageLinkDTO';
import IContactPagePostDTO from './IContactPagePostDTO';
import IContactPageSEODTO from './IContactPageSEODTO';
import ICreateContactPageCampaignDTO from './ICreateContactPageCampaignDTO';
import ICreateContactPageDTO from './ICreateContactPageDTO';
import ICreateContactPageLinkDTO from './ICreateContactPageLinkDTO';
import ICreateContactPageSEODTO from './ICreateContactPageSEODTO';
import IFormDTO from './IFormDTO';

export default interface IContactPageContextDTO {
  uploadProgress: number;
  currentContactPage: IContactPageDTO;
  currentContactPagePost: IContactPagePostDTO;
  currentContactPages: IContactPageDTO[];
  handleSetCurrentContactPage: (data: IContactPageDTO) => void;
  handleSetCurrentPost: (data: IContactPagePostDTO) => void;
  getContactPages: () => Promise<IContactPageDTO[]>;
  getContactPage: (id: string) => Promise<IContactPageDTO>;
  deleteContactPage: (id: string) => void;
  deleteContactPageForm: (id: string) => void;
  deleteContactPageSEO: (id: string) => void;
  deleteContactPageLink: (id: string) => void;
  deleteContactPageCampaign: (id: string) => void;
  deleteContactPagePost: (id: string) => void;
  createContactPage: (data: ICreateContactPageDTO) => Promise<IContactPageDTO>;
  createContactPageSEO: (data: ICreateContactPageSEODTO) => void;
  createContactPageForm: (data: IFormDTO) => void;
  createContactPageLink: (data: ICreateContactPageLinkDTO) => void;
  createContactPageCampaign: (data: ICreateContactPageCampaignDTO) => void;
  createContactPagePost: (
    destination_url: string,
  ) => Promise<IContactPagePostDTO>;
  updateContactPage: (data: IContactPageDTO) => void;
  updateContactPageSEO: (data: IContactPageSEODTO) => void;
  updateContactPageLink: (data: IContactPageLinkDTO) => void;
  updateContactPageCampaign: (data: IContactPageCampaignDTO) => void;
  updateContactPageMainImage: (e: ChangeEvent<HTMLInputElement>) => void;
  updateContactPagePost: (data: IContactPagePostDTO) => void;
  updateContactPageForm: (data: IContactPageFormDTO) => void;
  patchContactPageImagePost: (e: ChangeEvent<HTMLInputElement>) => void;
}
