import React from 'react';
import ICompanyContactDTO from '../../../../dtos/ICompanyContactDTO';
import { useCompanyContact } from '../../../../hooks/companyContacts';

import { Container } from './styles';

interface IProps {
  contact: ICompanyContactDTO;
  handleContactWindow: (contact: ICompanyContactDTO) => void;
}

const CompanyContactButton: React.FC<IProps> = ({
  contact,
  handleContactWindow,
}) => {
  const { selectedContact } = useCompanyContact();

  return (
    <Container
      isActive={selectedContact.id === contact.id}
      isNew={contact.isNew}
      key={contact.id}
    >
      <button type="button" onClick={() => handleContactWindow(contact)}>
        <p>{contact.name}</p>
      </button>
    </Container>
  );
};

export default CompanyContactButton;
