import { ChangeEvent } from 'react';
import IContactPageCampaignDTO from './IContactPageCampaignDTO';
import IContactPageDTO from './IContactPageDTO';
import IContactPageSEODTO from './IContactPageSEODTO';
import ICreateContactPageCampaignDTO from './ICreateContactPageCampaignDTO';
import ICreateContactPageDTO from './ICreateContactPageDTO';
import ICreateContactPageSEODTO from './ICreateContactPageSEODTO';

export default interface IContactPageContextDTO {
  currentContactPage: IContactPageDTO;
  currentContactPages: IContactPageDTO[];
  handleSetCurrentContactPage: (data: IContactPageDTO) => void;
  getContactPages: () => Promise<IContactPageDTO[]>;
  getContactPage: (id: string) => Promise<IContactPageDTO>;
  deleteContactPage: (id: string) => void;
  deleteContactPageSEO: (id: string) => void;
  deleteContactPageCampaign: (id: string) => void;
  createContactPage: (data: ICreateContactPageDTO) => Promise<IContactPageDTO>;
  createContactPageSEO: (data: ICreateContactPageSEODTO) => void;
  createContactPageCampaign: (data: ICreateContactPageCampaignDTO) => void;
  updateContactPage: (data: IContactPageDTO) => void;
  updateContactPageSEO: (data: IContactPageSEODTO) => void;
  updateContactPageCampaign: (data: IContactPageCampaignDTO) => void;
  updateContactPageMainImage: (e: ChangeEvent<HTMLInputElement>) => void;
}
