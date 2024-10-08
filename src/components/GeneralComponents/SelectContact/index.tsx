import React, { useCallback, useState } from 'react';
import ICompanyContactDTO from '../../../dtos/ICompanyContactDTO';
import { useCompanyContact } from '../../../hooks/companyContacts';
import { useToast } from '../../../hooks/toast';
import { sortContactsByNameAndFamilyName } from '../../../utils/sortContactsByNameAndFamilyName';
import WindowContainer from '../../WindowContainer';

import {
  Container,
  ContactsContainer,
  ContactButton,
  ContactMenuButton,
} from './styles';

interface IProps {
  selectContact: (e: ICompanyContactDTO) => void;
  closeWindow: Function;
}

const SelectContact: React.FC<IProps> = ({ selectContact, closeWindow }) => {
  const { addToast } = useToast();
  const {
    customersContacts,
    othersContacts,
    outsourcedsContacts,
    suppliersContacts,
    employeesContacts,
    companyContacts,
  } = useCompanyContact();

  const [filter, setFilter] = useState('Customers');
  const [mainFilter, setMainFilter] = useState('');

  const [filteredContacts, setFilteredContacts] = useState(customersContacts);

  const handleSetContacts = useCallback(
    (data: string) => {
      setFilter(data);
      if (data === 'Customers') {
        const sorted = sortContactsByNameAndFamilyName({
          contacts: customersContacts,
          filter: mainFilter,
        });
        return setFilteredContacts(sorted);
      }
      if (data === 'Employees') {
        const sorted = sortContactsByNameAndFamilyName({
          contacts: employeesContacts,
          filter: mainFilter,
        });
        return setFilteredContacts(sorted);
      }
      if (data === 'Outsourceds') {
        const sorted = sortContactsByNameAndFamilyName({
          contacts: outsourcedsContacts,
          filter: mainFilter,
        });
        return setFilteredContacts(sorted);
      }
      if (data === 'Others') {
        const sorted = sortContactsByNameAndFamilyName({
          contacts: othersContacts,
          filter: mainFilter,
        });
        return setFilteredContacts(sorted);
      }
      if (data === 'Suppliers') {
        const sorted = sortContactsByNameAndFamilyName({
          contacts: suppliersContacts,
          filter: mainFilter,
        });
        return setFilteredContacts(sorted);
      }
      const sorted = sortContactsByNameAndFamilyName({
        contacts: companyContacts,
        filter: mainFilter,
      });
      return setFilteredContacts(sorted);
    },
    [
      customersContacts,
      mainFilter,
      companyContacts,
      outsourcedsContacts,
      employeesContacts,
      othersContacts,
      suppliersContacts,
    ],
  );

  const handleFilterContacts = useCallback(
    (props: string) => {
      const searchfilter = props.toLowerCase();
      setMainFilter(searchfilter);
      const filteredResults = filteredContacts.filter(contact => {
        const contactName = contact.name.toLowerCase();
        return contactName.includes(searchfilter);
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

  const handleSelectContact = useCallback(
    (e: ICompanyContactDTO) => {
      selectContact(e);
      closeWindow();
    },
    [closeWindow, selectContact],
  );

  return (
    <WindowContainer
      onHandleCloseWindow={() => closeWindow()}
      containerStyle={{
        zIndex: 16,
        top: '5%',
        left: '5%',
        height: '90%',
        width: '90%',
      }}
    >
      <Container>
        <h2>Selecione o Cliente</h2>

        <span>
          <ContactMenuButton
            isActive={filter === 'CompanyContacts'}
            type="button"
            onClick={() => handleSetContacts('CompanyContacts')}
          >
            Todos
          </ContactMenuButton>
          <ContactMenuButton
            isActive={filter === 'Customers'}
            type="button"
            onClick={() => handleSetContacts('Customers')}
          >
            Clientes
          </ContactMenuButton>
          <ContactMenuButton
            isActive={filter === 'Employees'}
            type="button"
            onClick={() => handleSetContacts('Employees')}
          >
            Colaboradores
          </ContactMenuButton>
          <ContactMenuButton
            isActive={filter === 'Suppliers'}
            type="button"
            onClick={() => handleSetContacts('Suppliers')}
          >
            Fornecedores
          </ContactMenuButton>
          <ContactMenuButton
            isActive={filter === 'Outsourceds'}
            type="button"
            onClick={() => handleSetContacts('Outsourceds')}
          >
            Terceirizados
          </ContactMenuButton>
          <ContactMenuButton
            isActive={filter === 'Others'}
            type="button"
            onClick={() => handleSetContacts('Others')}
          >
            Outros
          </ContactMenuButton>
        </span>

        <input
          onChange={e => handleFilterContacts(e.target.value)}
          placeholder="Pesquisar"
        />
        <ContactsContainer>
          {filteredContacts.length > 0 &&
            filteredContacts.map(contact => {
              return (
                <ContactButton
                  key={contact.id}
                  type="button"
                  onClick={() => handleSelectContact(contact)}
                >
                  {contact.name} {contact.family_name}
                </ContactButton>
              );
            })}
        </ContactsContainer>
      </Container>
    </WindowContainer>
  );
};

export default SelectContact;
