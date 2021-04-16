import React, { useCallback, useEffect, useState } from 'react';
import ICompanyContactDTO from '../../../dtos/ICompanyContactDTO';
import { useCompanyContact } from '../../../hooks/companyContacts';
import { useStageCard } from '../../../hooks/stageCard';
import { useToast } from '../../../hooks/toast';
import Button from '../../Button';
import WindowContainer from '../../WindowContainer';

import {
  Container,
  ContactsContainer,
  ContactButton,
  ContactMenuButton,
} from './styles';

interface IProps {
  closeWindow: Function;
}

const SelectCustomer: React.FC<IProps> = ({ closeWindow }) => {
  const { addToast } = useToast();
  const {
    customersContacts,
    companyContacts,
    selectContact,
    selectedContact,
  } = useCompanyContact();
  const { getCardCustomers, createCardCustomer } = useStageCard();

  const handleSubmit = useCallback(async () => {
    try {
      await createCardCustomer(selectedContact);
      getCardCustomers();
      closeWindow();
      selectContact({} as ICompanyContactDTO);
      return addToast({
        type: 'success',
        title: 'Cliente adicionado com sucesso',
      });
    } catch (err) {
      addToast({
        type: 'error',
        title: 'Erro ao adicionar cliente',
      });

      throw new Error(err);
    }
  }, [
    addToast,
    selectContact,
    getCardCustomers,
    closeWindow,
    selectedContact,
    createCardCustomer,
  ]);
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

  const handleSelectCustomer = useCallback(
    (e: ICompanyContactDTO) => {
      console.log(e);
      selectedContact.id === e.id && selectContact({} as ICompanyContactDTO);
      selectedContact.id !== e.id && selectContact(e);
    },
    [selectContact, selectedContact],
  );

  const handleCloseWindow = useCallback(() => {
    selectContact({} as ICompanyContactDTO);
    closeWindow();
  }, [closeWindow, selectContact]);

  useEffect(() => {
    console.log(selectedContact);
  }, [selectedContact]);

  return (
    <WindowContainer
      onHandleCloseWindow={() => handleCloseWindow()}
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
                  isActive={selectedContact.id === contact.id}
                  key={contact.id}
                  type="button"
                  onClick={() => handleSelectCustomer(contact)}
                >
                  {contact.name} {contact.family_name}
                </ContactButton>
              );
            })}
        </ContactsContainer>
        {selectedContact && selectedContact.id && (
          <Button type="button" onClick={handleSubmit}>
            Adicionar
          </Button>
        )}
      </Container>
    </WindowContainer>
  );
};

export default SelectCustomer;