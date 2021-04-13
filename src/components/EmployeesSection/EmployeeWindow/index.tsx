import React, { useCallback } from 'react';
import ICompanyContactDTO from '../../../dtos/ICompanyContactDTO';
import IEmployeeDTO from '../../../dtos/IEmployeeDTO';
import { useCompanyContact } from '../../../hooks/companyContacts';
import { useCompanyEmployee } from '../../../hooks/companyEmployee';
import WindowContainer from '../../WindowContainer';
import CompanyEmployeeContactFamilyName from './CompanyEmployeeContactFamilyName';
import CompanyEmployeeContactName from './CompanyEmployeeContactName';

import { Container, EmployeeHeader, SubContainer } from './styles';

interface IProps {
  closeWindow: Function;
}

const EmployeeWindow: React.FC<IProps> = ({ closeWindow }) => {
  const { selectCompanyEmployee } = useCompanyEmployee();
  const { selectContact, selectedContact } = useCompanyContact();

  const handleCloseWindow = useCallback(() => {
    selectCompanyEmployee({} as IEmployeeDTO);
    selectContact({} as ICompanyContactDTO);
    closeWindow();
  }, [selectCompanyEmployee, closeWindow, selectContact]);

  return (
    <WindowContainer
      onHandleCloseWindow={() => handleCloseWindow()}
      containerStyle={{
        zIndex: 11,
        top: '5%',
        left: '5%',
        height: '90%',
        width: '90%',
      }}
    >
      <Container>
        <EmployeeHeader>
          <h2>Perfil do Colaborador</h2>
        </EmployeeHeader>
        <SubContainer>
          <section>
            <strong>Nome</strong>
            {selectedContact && selectedContact.id && (
              <CompanyEmployeeContactName />
            )}
          </section>
          <section>
            <strong>Sobrenome</strong>
            {selectedContact && selectedContact.id && (
              <CompanyEmployeeContactFamilyName />
            )}
          </section>
        </SubContainer>
      </Container>
    </WindowContainer>
  );
};

export default EmployeeWindow;
