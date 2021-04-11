import React, { useCallback, useState } from 'react';
import { MdPersonAdd } from 'react-icons/md';
import EmployeesList from './EmployeesList';

import Header from '../Header';
import MenuButton from '../MenuButton';

import { Container, SubContainer } from './styles';
import CreateCompanyEmployeeContainer from './CreateCompanyEmployeeContainer';

const EmployeesSection: React.FC = () => {
  const [addEmployee, setAddEmployee] = useState(false);

  const handleAddEmployee = useCallback((e: boolean) => {
    setAddEmployee(e);
  }, []);

  return (
    <Container>
      {addEmployee && (
        <CreateCompanyEmployeeContainer
          closeWindow={() => handleAddEmployee(false)}
        />
      )}
      <Header />
      <MenuButton />
      <SubContainer>
        <span>
          <h1>Colaboradores</h1>

          <button type="button" onClick={() => handleAddEmployee(true)}>
            <MdPersonAdd size={24} />
          </button>
        </span>
        <EmployeesList />
      </SubContainer>
    </Container>
  );
};

export default EmployeesSection;
