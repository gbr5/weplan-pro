import ICompanyContactDTO from '../dtos/ICompanyContactDTO';

interface IRequest {
  filter: string;
  contacts: ICompanyContactDTO[];
}

export const sortContactsByNameAndFamilyName = ({
  contacts,
  filter,
}: IRequest): ICompanyContactDTO[] => {
  const sortedContacts = contacts.filter(contact => {
    const findName = contact.name.includes(filter);
    const findFamilyName =
      contact.family_name && contact.family_name.includes(filter);

    if (findFamilyName === '') {
      return false;
    }
    if (findName || findFamilyName) {
      return true;
    }
    return false;
  });

  return sortedContacts;
};
