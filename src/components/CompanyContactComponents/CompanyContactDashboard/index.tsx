import React, { useCallback, useEffect, useState } from 'react';
import { useCompanyContact } from '../../../hooks/companyContacts';

import {
  Container,
  FirstRow,
  MenuButton,
  CompanyContact,
  CompanyContactMenu,
} from './styles';

const CompanyContactDashboard: React.FC = () => {
  const {
    companyContacts,
    getCompanyContacts,
    selectedContact,
    selectContact,
    customersContacts,
    suppliersContacts,
    othersContacts,
    employeesContacts,
    weplanUsersContacts,
    outsourcedsContacts,
  } = useCompanyContact();

  useEffect(() => {
    getCompanyContacts();
  }, [getCompanyContacts]);

  const [weplanContactUsersSection, setWeplanContactUsersSection] = useState(
    false,
  );
  const [allContactsSection, setAllContactsSection] = useState(true);

  const [customersSection, setCustomersSection] = useState(true);
  const [suppliersSection, setSuppliersSection] = useState(false);
  const [outsourcedsSection, setOutsourcedsSection] = useState(false);
  const [employeesSection, setEmployeesSection] = useState(false);
  const [othersSection, setOthersSection] = useState(false);

  const closeAllSections = useCallback(() => {
    setCustomersSection(false);
    setSuppliersSection(false);
    setOutsourcedsSection(false);
    setEmployeesSection(false);
    setOthersSection(false);
  }, []);

  const handleContactType = useCallback(
    (props: string) => {
      closeAllSections();
      props === 'Customers' && setCustomersSection(true);
      props === 'Suppliers' && setSuppliersSection(true);
      props === 'Employees' && setEmployeesSection(true);
      props === 'Outsourceds' && setOutsourcedsSection(true);
      props === 'Others' && setOthersSection(true);
    },
    [closeAllSections],
  );

  return (
    <>
      <Container>
        <h2>Contatos da empresa</h2>
        <CompanyContactMenu>
          {allContactsSection ? (
            <>
              <button
                type="button"
                onClick={() => setAllContactsSection(false)}
              >
                Filtro por tipo de contato
              </button>
              <div>
                <MenuButton
                  type="button"
                  isActive={weplanContactUsersSection}
                  onClick={() => setWeplanContactUsersSection(true)}
                >
                  Contatos Weplan
                </MenuButton>
                <MenuButton
                  type="button"
                  isActive={!weplanContactUsersSection}
                  onClick={() => setWeplanContactUsersSection(false)}
                >
                  Todos os contatos
                </MenuButton>
              </div>
            </>
          ) : (
            <>
              <button type="button" onClick={() => setAllContactsSection(true)}>
                Filtro por tipo de contato
              </button>
              <div>
                <MenuButton
                  type="button"
                  isActive={customersSection}
                  onClick={() => handleContactType('Customers')}
                >
                  Clientes
                </MenuButton>
                <MenuButton
                  type="button"
                  isActive={suppliersSection}
                  onClick={() => handleContactType('Suppliers')}
                >
                  Fornecedores
                </MenuButton>
                <MenuButton
                  type="button"
                  isActive={employeesSection}
                  onClick={() => handleContactType('Employees')}
                >
                  Colaboradores
                </MenuButton>
                <MenuButton
                  type="button"
                  isActive={outsourcedsSection}
                  onClick={() => handleContactType('Outsourceds')}
                >
                  Terceirizados
                </MenuButton>
                <MenuButton
                  type="button"
                  isActive={othersSection}
                  onClick={() => handleContactType('Others')}
                >
                  Outros
                </MenuButton>
              </div>
            </>
          )}
        </CompanyContactMenu>
        <FirstRow>
          {allContactsSection &&
            weplanContactUsersSection &&
            weplanUsersContacts.map(contact => {
              let contactType = '';
              if (contact.company_contact_type === 'Customer') {
                contactType = 'Cliente';
              }
              if (contact.company_contact_type === 'Supplier') {
                contactType = 'Fornecedor';
              }
              if (contact.company_contact_type === 'Employee') {
                contactType = 'Colaborador';
              }
              if (contact.company_contact_type === 'Outsourced') {
                contactType = 'Terceirizado';
              }
              if (contact.company_contact_type === 'Other') {
                contactType = 'Outros';
              }

              return (
                <CompanyContact
                  isActive={selectedContact.id === contact.id}
                  key={contact.id}
                >
                  <button type="button" onClick={() => selectContact(contact)}>
                    <p>Nome: {contact.name}</p>
                    <p>Descrição: {contact.description}</p>
                    <p>Tipo de contato: {contactType}</p>
                  </button>
                </CompanyContact>
              );
            })}
          {allContactsSection &&
            !weplanContactUsersSection &&
            companyContacts.map(contact => {
              let contactType = '';
              if (contact.company_contact_type === 'Customer') {
                contactType = 'Cliente';
              }
              if (contact.company_contact_type === 'Supplier') {
                contactType = 'Fornecedor';
              }
              if (contact.company_contact_type === 'Employee') {
                contactType = 'Colaborador';
              }
              if (contact.company_contact_type === 'Outsourced') {
                contactType = 'Terceirizado';
              }
              if (contact.company_contact_type === 'Other') {
                contactType = 'Outros';
              }
              return (
                <CompanyContact
                  isActive={selectedContact.id === contact.id}
                  key={contact.id}
                >
                  <button type="button" onClick={() => selectContact(contact)}>
                    <p>{contact.name}</p>
                    <p>Descrição: {contact.description}</p>
                    <p>Tipo de contato: {contactType}</p>
                  </button>
                </CompanyContact>
              );
            })}
          {!allContactsSection &&
            customersSection &&
            customersContacts.map(contact => {
              return (
                <CompanyContact
                  isActive={selectedContact.id === contact.id}
                  key={contact.id}
                >
                  <button type="button" onClick={() => selectContact(contact)}>
                    <p>{contact.name}</p>
                    <p>Descrição: {contact.description}</p>
                  </button>
                </CompanyContact>
              );
            })}
          {!allContactsSection &&
            suppliersSection &&
            suppliersContacts.map(contact => {
              return (
                <CompanyContact
                  isActive={selectedContact.id === contact.id}
                  key={contact.id}
                >
                  <button type="button" onClick={() => selectContact(contact)}>
                    <p>{contact.name}</p>
                    <p>Descrição: {contact.description}</p>
                  </button>
                </CompanyContact>
              );
            })}
          {!allContactsSection &&
            employeesSection &&
            employeesContacts.map(contact => {
              return (
                <CompanyContact
                  isActive={selectedContact.id === contact.id}
                  key={contact.id}
                >
                  <button type="button" onClick={() => selectContact(contact)}>
                    <p>{contact.name}</p>
                    <p>Descrição: {contact.description}</p>
                  </button>
                </CompanyContact>
              );
            })}
          {!allContactsSection &&
            outsourcedsSection &&
            outsourcedsContacts.map(contact => {
              return (
                <CompanyContact
                  isActive={selectedContact.id === contact.id}
                  key={contact.id}
                >
                  <button type="button" onClick={() => selectContact(contact)}>
                    <p>{contact.name}</p>
                    <p>Descrição: {contact.description}</p>
                  </button>
                </CompanyContact>
              );
            })}
          {!allContactsSection &&
            othersSection &&
            othersContacts.map(contact => {
              return (
                <CompanyContact
                  isActive={selectedContact.id === contact.id}
                  key={contact.id}
                >
                  <button type="button" onClick={() => selectContact(contact)}>
                    <p>{contact.name}</p>
                    <p>Descrição: {contact.description}</p>
                  </button>
                </CompanyContact>
              );
            })}
        </FirstRow>
      </Container>
    </>
  );
};

export default CompanyContactDashboard;
