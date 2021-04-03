import React, { useEffect, useState } from 'react';
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
  const [newNotes, setNewNotes] = useState(0);
  // console.log(contact.notes);

  useEffect(() => {
    if (contact.notes.length > 0) {
      const notes = contact.notes.filter(note => note.isNew === true).length;
      notes > 0 && setNewNotes(notes);
    }
  }, [contact.notes]);
  return (
    <Container
      isActive={selectedContact.id === contact.id}
      isNew={contact.isNew}
      key={contact.id}
    >
      <button type="button" onClick={() => handleContactWindow(contact)}>
        <p>{contact.name}</p>
      </button>
      {newNotes > 0 && <span>{newNotes}</span>}
    </Container>
  );
};

export default CompanyContactButton;
