import React, { useCallback, useEffect, useState } from 'react';
import ICompanyContactDTO from '../../dtos/ICompanyContactDTO';
import { useAuth } from '../../hooks/auth';
import api from '../../services/api';

import {
  Container,
  FirstRow,
  MenuButton,
  CompanyContact,
  CompanyContactMenu,
} from './styles';

const CompanyContactDashboard: React.FC = () => {
  const { company } = useAuth();

  const [weplanContactUsersSection, setWeplanContactUsersSection] = useState(
    false,
  );
  const [allContactsSection, setAllContactsSection] = useState(true);

  const [customers, setCustomers] = useState<ICompanyContactDTO[]>([]);
  const [customersSection, setCustomersSection] = useState(true);
  const [suppliersSection, setSuppliersSection] = useState(false);
  const [suppliers, setSuppliers] = useState<ICompanyContactDTO[]>([]);
  const [outsourcedsSection, setOutsourcedsSection] = useState(false);
  const [outsourceds, setOutsourceds] = useState<ICompanyContactDTO[]>([]);
  const [employeesSection, setEmployeesSection] = useState(false);
  const [employees, setEmployees] = useState<ICompanyContactDTO[]>([]);
  const [others, setOthers] = useState<ICompanyContactDTO[]>([]);
  const [othersSection, setOthersSection] = useState(false);
  const [weplanCompanyContacts, setWeplanCompanyContacts] = useState<
    ICompanyContactDTO[]
  >([]);
  const [companyContacts, setCompanyContacts] = useState<ICompanyContactDTO[]>(
    [],
  );
  const [selectedContact, setSelectedContact] = useState<ICompanyContactDTO>(
    {} as ICompanyContactDTO,
  );

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

  const getCompanyContacts = useCallback(() => {
    try {
      api
        .get<ICompanyContactDTO[]>(`company/contacts/${company.id}`)
        .then(response => {
          setCustomers(
            response.data.filter(
              contact => contact.company_contact_type === 'Customer',
            ),
          );
          setSuppliers(
            response.data.filter(
              contact => contact.company_contact_type === 'Supplier',
            ),
          );
          setEmployees(
            response.data.filter(
              contact => contact.company_contact_type === 'Employee',
            ),
          );
          setOutsourceds(
            response.data.filter(
              contact => contact.company_contact_type === 'Outsourced',
            ),
          );
          setOthers(
            response.data.filter(
              contact => contact.company_contact_type === 'Other',
            ),
          );
          setCompanyContacts(response.data);
          setWeplanCompanyContacts(
            response.data.filter(contact => contact.weplanUser),
          );
        });
    } catch (err) {
      throw new Error(err);
    }
  }, [company]);

  const handleSelectContact = useCallback(
    (props: ICompanyContactDTO) => {
      if (selectedContact.id === props.id) {
        return setSelectedContact({} as ICompanyContactDTO);
      }
      return setSelectedContact(props);
    },
    [selectedContact],
  );

  useEffect(() => {
    getCompanyContacts();
  }, [getCompanyContacts]);

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
            weplanCompanyContacts.map(contact => {
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
                  <button
                    type="button"
                    onClick={() => handleSelectContact(contact)}
                  >
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
                  <button
                    type="button"
                    onClick={() => handleSelectContact(contact)}
                  >
                    <p>{contact.name}</p>
                    <p>Descrição: {contact.description}</p>
                    <p>Tipo de contato: {contactType}</p>
                  </button>
                </CompanyContact>
              );
            })}
          {!allContactsSection &&
            customersSection &&
            customers.map(contact => {
              return (
                <CompanyContact
                  isActive={selectedContact.id === contact.id}
                  key={contact.id}
                >
                  <button
                    type="button"
                    onClick={() => handleSelectContact(contact)}
                  >
                    <p>{contact.name}</p>
                    <p>Descrição: {contact.description}</p>
                  </button>
                </CompanyContact>
              );
            })}
          {!allContactsSection &&
            suppliersSection &&
            suppliers.map(contact => {
              return (
                <CompanyContact
                  isActive={selectedContact.id === contact.id}
                  key={contact.id}
                >
                  <button
                    type="button"
                    onClick={() => handleSelectContact(contact)}
                  >
                    <p>{contact.name}</p>
                    <p>Descrição: {contact.description}</p>
                  </button>
                </CompanyContact>
              );
            })}
          {!allContactsSection &&
            employeesSection &&
            employees.map(contact => {
              return (
                <CompanyContact
                  isActive={selectedContact.id === contact.id}
                  key={contact.id}
                >
                  <button
                    type="button"
                    onClick={() => handleSelectContact(contact)}
                  >
                    <p>{contact.name}</p>
                    <p>Descrição: {contact.description}</p>
                  </button>
                </CompanyContact>
              );
            })}
          {!allContactsSection &&
            outsourcedsSection &&
            outsourceds.map(contact => {
              return (
                <CompanyContact
                  isActive={selectedContact.id === contact.id}
                  key={contact.id}
                >
                  <button
                    type="button"
                    onClick={() => handleSelectContact(contact)}
                  >
                    <p>{contact.name}</p>
                    <p>Descrição: {contact.description}</p>
                  </button>
                </CompanyContact>
              );
            })}
          {!allContactsSection &&
            othersSection &&
            others.map(contact => {
              return (
                <CompanyContact
                  isActive={selectedContact.id === contact.id}
                  key={contact.id}
                >
                  <button
                    type="button"
                    onClick={() => handleSelectContact(contact)}
                  >
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
