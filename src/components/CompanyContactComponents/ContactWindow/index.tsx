import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useCompanyContact } from '../../../hooks/companyContacts';
import Button from '../../Button';
import ConfirmationWindow from '../../GeneralComponents/ConfirmationWindow';
import WindowContainer from '../../WindowContainer';
import ContactInfoField from './ContactInfoField';

import { Container } from './styles';

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
  const contactType = useMemo(() => {
    if (selectedContact.company_contact_type === 'Customers') {
      return 'Clientes';
    }
    if (selectedContact.company_contact_type === 'Suppliers') {
      return 'Fornecedores';
    }
    if (selectedContact.company_contact_type === 'Employees') {
      return 'Funcionários';
    }
    if (selectedContact.company_contact_type === 'Outsourceds') {
      return 'Terceirizados';
    }
    if (selectedContact.company_contact_type === 'Others') {
      return 'Outros';
    }
    return '';
  }, [selectedContact]);

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
        <h1>{selectedContact.name}</h1>
        <p>{contactType}</p>

        <p>{selectedContact.description}</p>

        {selectedContact.contact_infos.map(contact => {
          return <ContactInfoField key={contact.id} contactField={contact} />;
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
