import React from 'react';

import { useCompanyEmployee } from '../../../hooks/companyEmployee';
import EmployeeButton from './EmployeeButton';
import { Container, Employee } from './styles';

const EmployeesList: React.FC = () => {
  const { companyEmployees } = useCompanyEmployee();

  return (
    <Container>
      {companyEmployees &&
        companyEmployees.length > 0 &&
        companyEmployees.map(employee => {
          const index =
            companyEmployees.findIndex(
              employeeIndex => employeeIndex.id === employee.id,
            ) + 1;
          return (
            <Employee key={employee.id}>
              <p>{index}</p>
              <EmployeeButton employee={employee} />
            </Employee>
          );
        })}
    </Container>
  );
};

export default EmployeesList;
