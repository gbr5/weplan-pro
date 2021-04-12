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
import CompanyContactTypeField from './CompanyContactTypeField';
import CreateContactInfoField from './CreateContactInfoField';
import CreateContactNote from './CreateContactNote';
import { useCompanyEmployee } from '../../../hooks/companyEmployee';

interface IProps {
  closeWindow: Function;
}

const ContactWindow: React.FC<IProps> = ({ closeWindow }) => {
  const {
    selectedContact,
    updateCompanyContactIsNew,
    deleteCompanyContact,
    contactEmployee,
  } = useCompanyContact();
  const { master } = useCompanyEmployee();
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
      {deleteContactConfirmation &&
        ((contactEmployee && !contactEmployee.id) || !contactEmployee) && (
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
      {deleteContactConfirmation && contactEmployee && contactEmployee.id && (
        <ConfirmationWindow
          closeWindow={() => handleDeleteContactConfirmation(false)}
          message="Ao deletar o contato você também irá deletar o colaborador. Deseja realmente deletar o contato?"
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
        <CompanyContactTypeField />

        <h3>Contatos</h3>
        {selectedContact &&
          selectedContact.contact_infos &&
          selectedContact.contact_infos.length > 0 &&
          selectedContact.contact_infos.map(contactInfo => {
            return (
              <ContactInfoField
                key={contactInfo.id}
                contactField={contactInfo}
              />
            );
          })}

        <CreateContactInfoField />
        <h3>Notas</h3>
        {selectedContact &&
          selectedContact.contact_infos &&
          selectedContact.contact_infos.length > 0 &&
          selectedContact.notes.map(note => {
            return <ContactNote key={note.id} contactNote={note} />;
          })}
        <CreateContactNote />
        {master && master.id && (
          <Button
            type="button"
            onClick={() => handleDeleteContactConfirmation(true)}
          >
            Deletar Contato
          </Button>
        )}
      </Container>
    </WindowContainer>
  );
};

export default ContactWindow;
