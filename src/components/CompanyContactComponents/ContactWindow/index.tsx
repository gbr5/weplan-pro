import React, { useEffect, useMemo } from 'react';
import { useCompanyContact } from '../../../hooks/companyContacts';
import WindowContainer from '../../WindowContainer';

import { Container, ContactContainer } from './styles';

interface IProps {
  closeWindow: Function;
}

const ContactWindow: React.FC<IProps> = ({ closeWindow }) => {
  const { selectedContact, updateCompanyContactIsNew } = useCompanyContact();
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
      <Container>
        <h1>{selectedContact.name}</h1>
        <p>{contactType}</p>

        <p>{selectedContact.description}</p>

        {selectedContact.contact_infos.map(contact => {
          return (
            <ContactContainer key={contact.id}>
              <p>{contact.info_type}</p>
              <p>{contact.info}</p>
            </ContactContainer>
          );
        })}
      </Container>
    </WindowContainer>
  );
};

export default ContactWindow;
