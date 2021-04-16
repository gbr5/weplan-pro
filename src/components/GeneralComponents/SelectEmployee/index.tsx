import React, { useCallback, useState } from 'react';
import ICompanyContactDTO from '../../../dtos/ICompanyContactDTO';
import { useCompanyContact } from '../../../hooks/companyContacts';
import { useToast } from '../../../hooks/toast';
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

const SelectCustomer: React.FC<IProps> = ({ selectContact, closeWindow }) => {
  const { addToast } = useToast();
  const { customersContacts, companyContacts } = useCompanyContact();

  const [filter, setFilter] = useState('Customers');
  const [mainFilter, setMainFilter] = useState('');

  const [filteredContacts, setFilteredContacts] = useState(customersContacts);

  const handleSetCompanyContacts = useCallback(() => {
    setFilteredContacts(
      companyContacts.filter(contact => {
        const findName = contact.name.includes(mainFilter);
        const findFamilyName =
          contact.family_name && contact.family_name.includes(mainFilter);
        if (findFamilyName === '') {
          return false;
        }
        if (findName || findFamilyName) {
          return true;
        }
        return false;
      }),
    );
    setFilter('CompanyContacts');
  }, [companyContacts, mainFilter]);

  const handleSetCustomersContacts = useCallback(() => {
    setFilteredContacts(
      customersContacts.filter(contact => {
        const findName = contact.name.includes(mainFilter);
        const findFamilyName =
          contact.family_name && contact.family_name.includes(mainFilter);
        if (findFamilyName === '') {
          return false;
        }
        if (findName || findFamilyName) {
          return true;
        }
        return false;
      }),
    );
    setFilter('Customers');
  }, [customersContacts, mainFilter]);

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
            isActive={filter === 'Customers'}
            type="button"
            onClick={handleSetCustomersContacts}
          >
            Clientes
          </ContactMenuButton>
          <ContactMenuButton
            isActive={filter === 'CompanyContacts'}
            type="button"
            onClick={handleSetCompanyContacts}
          >
            Outros Contatos
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

export default SelectCustomer;
