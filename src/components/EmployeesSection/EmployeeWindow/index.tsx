import React from 'react';
import { useCompanyEmployee } from '../../../hooks/companyEmployee';
import WindowContainer from '../../WindowContainer';

import { Container, EmployeeHeader } from './styles';

interface IProps {
  closeWindow: Function;
}

const EmployeeWindow: React.FC<IProps> = ({ closeWindow }) => {
  const { selectedCompanyEmployee } = useCompanyEmployee();

  return (
    <WindowContainer
      onHandleCloseWindow={() => closeWindow()}
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
          <p>Perfil do</p>
          <h2>{selectedCompanyEmployee.employeeUser.name}</h2>
        </EmployeeHeader>
      </Container>
    </WindowContainer>
  );
};

export default EmployeeWindow;
