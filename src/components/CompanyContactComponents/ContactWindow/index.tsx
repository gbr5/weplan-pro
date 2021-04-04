import React, { useCallback, useEffect, useState } from 'react';
import { useCompanyContact } from '../../../hooks/companyContacts';
import Button from '../../Button';
import ConfirmationWindow from '../../GeneralComponents/ConfirmationWindow';
import WindowContainer from '../../WindowContainer';
import ContactInfoField from './ContactInfoField';
import ContactNameAndFamilyName from './ContactNameAndFamilyName';
import ContactNote from './ContactNote';
import ContactDescription from './ContactDescription';

import { Container } from './styles';
import ContactType from './ContactType';

interface IProps {
  closeWindow: Function;
}

const ContactWindow: React.FC<IProps> = ({ closeWindow }) => {
  const {
    selectedContact,
    updateCompanyContactIsNew,
    deleteCompanyContact,
  } = useCompanyContact();
  const [deleteContactConfirmation, setDeleteContactConfirmation] = useState(
    false,
  );
  useEffect(() => {
    if (selectedContact.isNew) {
      updateCompanyContactIsNew(selectedContact);
    }
  }, [updateCompanyContactIsNew, selectedContact]);

  const handleDeleteCompanyContact = useCallback(() => {
    deleteCompanyContact(selectedContact);
    closeWindow();
  }, [deleteCompanyContact, closeWindow, selectedContact]);

  const handleDeleteContactConfirmation = useCallback((e: boolean) => {
    setDeleteContactConfirmation(e);
  }, []);
  return (
    <WindowContainer
      onHandleCloseWindow={() => closeWindow()}
      containerStyle={{
        zIndex: 10,
        top: '5%',
        left: '5%',
        height: '90%',
        width: '90%',
      }}
    >
      {deleteContactConfirmation && (
        <ConfirmationWindow
          closeWindow={() => handleDeleteContactConfirmation(false)}
          message="Deletar contato permanentemente"
          firstButtonFunction={handleDeleteCompanyContact}
          firstButtonLabel="Deletar"
          secondButtonFunction={() => handleDeleteContactConfirmation(false)}
          secondButtonLabel="Não Deletar"
          zIndex={15}
        />
      )}
      <Container>
        <ContactNameAndFamilyName />
        <ContactDescription />
        <ContactType />

        <h3>Contatos</h3>
        {selectedContact.contact_infos.map(contactInfo => {
          return (
            <ContactInfoField key={contactInfo.id} contactField={contactInfo} />
          );
        })}
        <h3>Notas</h3>
        {selectedContact.notes.map(note => {
          return <ContactNote key={note.id} contactNote={note} />;
        })}

        <Button
          type="button"
          onClick={() => handleDeleteContactConfirmation(true)}
        >
          Deletar Contato
        </Button>
      </Container>
    </WindowContainer>
  );
};

export default ContactWindow;
