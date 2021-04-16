import React, { useCallback, useEffect, useRef, useState } from 'react';
import ICompanyContactDTO from '../../../dtos/ICompanyContactDTO';
import { useCompanyContact } from '../../../hooks/companyContacts';
import { useCompanyEmployee } from '../../../hooks/companyEmployee';
import { useToast } from '../../../hooks/toast';
import WindowContainer from '../../WindowContainer';

import { Container, ContactsContainer, ContactButton } from './styles';

interface IProps {
  closeWindow: Function;
}

const SelectEmployee: React.FC<IProps> = ({ closeWindow }) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const { addToast } = useToast();
  const {
    employeesContacts,
    selectContact,
    getCompanyEmployeeContact,
    getCompanyContacts,
  } = useCompanyContact();
  const { selectCompanyEmployee } = useCompanyEmployee();

  const [filteredContacts, setFilteredContacts] = useState(employeesContacts);

  const handleFilterContacts = useCallback(
    (props: string) => {
      const searchfilter = props.toLowerCase();
      const filteredResults = filteredContacts.filter(contact => {
        const contactName = contact.name.toLowerCase();
        return contactName.includes(searchfilter);
      });
      filteredResults.length <= 0 &&
        addToast({
          type: 'info',
          title: 'Nenhum contato foi encontrado',
        });
      filteredResults.length <= 0 &&
        inputRef.current &&
        inputRef.current.setRangeText('');

      setFilteredContacts(filteredResults);
    },
    [filteredContacts, addToast],
  );

  const handleSelectContact = useCallback(
    async (e: ICompanyContactDTO) => {
      const findEmployee = await getCompanyEmployeeContact(e.id);
      if (findEmployee) {
        selectCompanyEmployee(findEmployee);
        selectContact(e);
      } else {
        addToast({
          type: 'error',
          title: 'Este contato não está associado a nenhum colaborador!',
        });
      }
    },
    [addToast, selectCompanyEmployee, getCompanyEmployeeContact, selectContact],
  );

  useEffect(() => {
    getCompanyContacts();
  }, [getCompanyContacts]);

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
        <h2>Selecione o Colaborador</h2>

        <input
          name="filter"
          autoComplete="off"
          ref={inputRef}
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

export default SelectEmployee;
