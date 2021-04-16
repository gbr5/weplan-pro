import React, { useCallback, useEffect, useRef, useState } from 'react';
import { MdPersonAdd } from 'react-icons/md';
import ICompanyContactDTO from '../../../dtos/ICompanyContactDTO';
import { useCompanyContact } from '../../../hooks/companyContacts';
import { useCompanyEmployee } from '../../../hooks/companyEmployee';
import { useToast } from '../../../hooks/toast';
import CreateCompanyEmployeeContainer from '../../EmployeesSection/CreateCompanyEmployeeContainer';
import WindowContainer from '../../WindowContainer';

import { Container, ContactsContainer, ContactButton } from './styles';

interface IProps {
  closeWindow: Function;
}

const SelectEmployee: React.FC<IProps> = ({ closeWindow }) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const { master } = useCompanyEmployee();
  const { addToast } = useToast();
  const {
    employeesContacts,
    selectContact,
    getCompanyEmployeeContact,
    getCompanyContacts,
  } = useCompanyContact();
  const { selectCompanyEmployee } = useCompanyEmployee();

  const [filteredContacts, setFilteredContacts] = useState(employeesContacts);
  const [addEmployee, setAddEmployee] = useState(false);

  const handleFilterContacts = useCallback(
    (props: string) => {
      if (props === '') {
        return setFilteredContacts(employeesContacts);
      }
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

      return setFilteredContacts(filteredResults);
    },
    [filteredContacts, employeesContacts, addToast],
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

  const handleAddEmployee = useCallback((e: boolean) => {
    setAddEmployee(e);
  }, []);

  useEffect(() => {
    getCompanyContacts();
  }, [getCompanyContacts]);

  return (
    <>
      {addEmployee && (
        <CreateCompanyEmployeeContainer
          closeWindow={() => handleAddEmployee(false)}
        />
      )}
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
          <span>
            <h2>Selecione o Colaborador</h2>
            {master && (
              <button type="button" onClick={() => handleAddEmployee(true)}>
                <MdPersonAdd size={20} />
              </button>
            )}
          </span>

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
    </>
  );
};

export default SelectEmployee;
