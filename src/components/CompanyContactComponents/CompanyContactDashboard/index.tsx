import React, { useCallback, useEffect, useState } from 'react';
import { MdPersonAdd } from 'react-icons/md';
import ICompanyContactDTO from '../../../dtos/ICompanyContactDTO';
import { useCompanyContact } from '../../../hooks/companyContacts';
import { useToast } from '../../../hooks/toast';
import Header from '../../Header';
import MenuButton from '../../MenuButton';
import ContactWindow from '../ContactWindow';
import CreateCompanyContactForm from '../CreateCompanyContactForm';
import CompanyContactButton from './CompanyContactButton';

import {
  Container,
  ContactTypeSection,
  ContactMenuButton,
  FirstRow,
} from './styles';

const CompanyContactDashboard: React.FC = () => {
  const { addToast } = useToast();
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

  const [createContactWindow, setCreateContactWindow] = useState(false);
  const [contactWindow, setContactWindow] = useState(false);
  const [filteredContacts, setFilteredContacts] = useState<
    ICompanyContactDTO[]
  >([]);
  const [filterTitle, setFilterTitle] = useState('Todos');

  useEffect(() => {
    if (companyContacts.length > 0 && filteredContacts.length <= 0) {
      setFilteredContacts(companyContacts);
    }
  }, [companyContacts, filteredContacts]);

  const handleContactType = useCallback(
    (props: string) => {
      if (props === 'Customers') {
        customersContacts.length > 0 && setFilteredContacts(customersContacts);
        customersContacts.length > 0 && setFilterTitle('Clientes');
        customersContacts.length <= 0 &&
          addToast({
            type: 'info',
            title: 'A categoria de "Clientes" ainda não possui contatos',
          });
      }
      if (props === 'Suppliers') {
        suppliersContacts.length > 0 && setFilteredContacts(suppliersContacts);
        suppliersContacts.length > 0 && setFilterTitle('Fornecedores');
        suppliersContacts.length <= 0 &&
          addToast({
            type: 'info',
            title: 'A categoria "Fornecedores" ainda não possui contatos',
          });
      }
      if (props === 'Employees') {
        employeesContacts.length > 0 && setFilteredContacts(employeesContacts);
        employeesContacts.length > 0 && setFilterTitle('Colaboradores');
        employeesContacts.length <= 0 &&
          addToast({
            type: 'info',
            title: 'A categoria "Colaboradores" ainda não possui contatos',
          });
      }
      if (props === 'Outsourceds') {
        outsourcedsContacts.length > 0 && setFilterTitle('Terceirizados');
        outsourcedsContacts.length > 0 &&
          setFilteredContacts(outsourcedsContacts);
        outsourcedsContacts.length <= 0 &&
          addToast({
            type: 'info',
            title: 'A categoria "Terceirizados" ainda não possui contatos',
          });
      }
      if (props === 'Others') {
        othersContacts.length > 0 && setFilteredContacts(othersContacts);
        othersContacts.length > 0 && setFilterTitle('Outros');
        othersContacts.length <= 0 &&
          addToast({
            type: 'info',
            title: 'A categoria "Outros" ainda não possui contatos',
          });
      }
      if (props === 'WePlan') {
        weplanUsersContacts.length > 0 && setFilterTitle('WePlan');
        weplanUsersContacts.length > 0 &&
          setFilteredContacts(weplanUsersContacts);
        weplanUsersContacts.length <= 0 &&
          addToast({
            type: 'info',
            title: 'A categoria "Usuários WePlan" ainda não possui contatos',
          });
      }
      if (props === 'All') {
        companyContacts.length > 0 && setFilteredContacts(companyContacts);
        companyContacts.length > 0 && setFilterTitle('Todos');
        companyContacts.length <= 0 &&
          addToast({
            type: 'info',
            title: 'Você ainda não possui contatos',
          });
      }
    },
    [
      customersContacts,
      suppliersContacts,
      employeesContacts,
      outsourcedsContacts,
      othersContacts,
      weplanUsersContacts,
      companyContacts,
      addToast,
    ],
  );

  const handleFilterContacts = useCallback(
    (props: string) => {
      const filter = props.toLowerCase();
      const filteredResults = filteredContacts.filter(contact => {
        const contactName = contact.name.toLowerCase();
        return contactName.includes(filter);
      });
      filteredResults.length <= 0 &&
        addToast({
          type: 'info',
          title: 'Nenhum contato foi encontrado',
        });
      setFilteredContacts(filteredResults);
    },
    [filteredContacts, addToast],
  );

  const handleContactWindow = useCallback(
    (contact: ICompanyContactDTO) => {
      selectContact(contact);
      setContactWindow(true);
    },
    [selectContact],
  );

  const handleCloseContactWindow = useCallback(() => {
    setContactWindow(false);
    selectContact({} as ICompanyContactDTO);
    getCompanyContacts();
  }, [getCompanyContacts, selectContact]);

  const handleCreateContactWindow = useCallback(
    (e: boolean) => {
      if (e) {
        setCreateContactWindow(true);
      } else {
        getCompanyContacts();
        setCreateContactWindow(false);
      }
    },
    [getCompanyContacts],
  );

  useEffect(() => {
    if (selectedContact) {
      setContactWindow(true);
    }
  }, [selectedContact]);

  return (
    <>
      {contactWindow && selectedContact && selectedContact.id && (
        <ContactWindow closeWindow={handleCloseContactWindow} />
      )}
      {createContactWindow && (
        <CreateCompanyContactForm
          handleCloseWindow={() => handleCreateContactWindow(false)}
        />
      )}
      <Header />
      <MenuButton />
      <Container>
        <h2>Contatos da empresa</h2>
        <section>
          <ContactMenuButton
            isActive={filterTitle === 'Todos'}
            type="button"
            onClick={() => handleContactType('All')}
          >
            Todos
          </ContactMenuButton>
          {/* <MenuButton
            isActive={filterTitle === 'WePlan'}
            type="button"
            onClick={() => handleContactType('WePlan')}
          >
            WePlan
          </MenuButton> */}
          <ContactMenuButton
            isActive={false}
            type="button"
            onClick={() => handleCreateContactWindow(true)}
          >
            <MdPersonAdd size={24} />
          </ContactMenuButton>
        </section>
        <input
          onChange={e => handleFilterContacts(e.target.value)}
          placeholder="Pesquisar"
        />
        <ContactTypeSection>
          <ContactMenuButton
            isActive={filterTitle === 'Clientes'}
            type="button"
            onClick={() => handleContactType('Customers')}
          >
            Clientes
          </ContactMenuButton>
          <ContactMenuButton
            isActive={filterTitle === 'Fornecedores'}
            type="button"
            onClick={() => handleContactType('Suppliers')}
          >
            Fornecedores
          </ContactMenuButton>
          <ContactMenuButton
            isActive={filterTitle === 'Colaboradores'}
            type="button"
            onClick={() => handleContactType('Employees')}
          >
            Colaboradores
          </ContactMenuButton>
          <ContactMenuButton
            isActive={filterTitle === 'Terceirizados'}
            type="button"
            onClick={() => handleContactType('Outsourceds')}
          >
            Terceirizados
          </ContactMenuButton>
          <ContactMenuButton
            isActive={filterTitle === 'Outros'}
            type="button"
            onClick={() => handleContactType('Others')}
          >
            Outros
          </ContactMenuButton>
        </ContactTypeSection>

        <FirstRow>
          {filteredContacts.map(contact => {
            return (
              <CompanyContactButton
                key={contact.id}
                contact={contact}
                handleContactWindow={() => handleContactWindow(contact)}
              />
            );
          })}
        </FirstRow>
      </Container>
    </>
  );
};

export default CompanyContactDashboard;
