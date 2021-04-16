import React, { useCallback, useEffect, useState } from 'react';
import { MdPersonAdd } from 'react-icons/md';
import EmployeesList from './EmployeesList';

import Header from '../Header';

import { Container, SubContainer } from './styles';
import CreateCompanyEmployeeContainer from './CreateCompanyEmployeeContainer';
import { useCompanyEmployee } from '../../hooks/companyEmployee';

const EmployeesSection: React.FC = () => {
  const { getCompanyEmployees } = useCompanyEmployee();
  const [addEmployee, setAddEmployee] = useState(false);

  const handleAddEmployee = useCallback((e: boolean) => {
    setAddEmployee(e);
  }, []);

  useEffect(() => {
    getCompanyEmployees();
  }, [getCompanyEmployees]);

  return (
    <Container>
      {addEmployee && (
        <CreateCompanyEmployeeContainer
          closeWindow={() => handleAddEmployee(false)}
        />
      )}
      <Header />
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
