interface ICompanyContactInfo {
  id: string;
  info_type: string;
  info: string;
}

export default interface ICompanyContactDTO {
  id: string;
  name: string;
  description: string;
  company_contact_type: string;
  weplanUser: boolean;
  isCompany: boolean;
  contact_infos: ICompanyContactInfo[];
}
