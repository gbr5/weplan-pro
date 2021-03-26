import IContactPageFormDTO from './IContactPageFormDTO';
import IContactPageLinkDTO from './IContactPageLinkDTO';
import IContactPagePostDTO from './IContactPagePostDTO';
import IContactPageCampaignDTO from './IContactPageCampaignDTO';
import IContactPageSEODTO from './IContactPageSEODTO';

export default interface IContactPageDTO {
  id: string;
  slug: string;
  title: string;
  cta_label: string;
  cta_url: string;
  isActive: boolean;
  posts: IContactPagePostDTO[];
  links: IContactPageLinkDTO[];
  forms: IContactPageFormDTO[];
  campaigns: IContactPageCampaignDTO[];
  seo: IContactPageSEODTO;
  main_image_url: string;
  image_url: string;
}
