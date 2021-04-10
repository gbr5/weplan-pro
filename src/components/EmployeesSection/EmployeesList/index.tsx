import React from 'react';
import { MdClose, MdDone } from 'react-icons/md';
import { useCompanyEmployee } from '../../../hooks/companyEmployee';
import { Container, Employee } from './styles';

const EmployeesList: React.FC = () => {
  const iconsize = 20;
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
            <Employee isNotActive={!employee.isActive} key={employee.id}>
              <p>{index}</p>
              <button type="button">
                <strong>{employee.employeeUser.name}</strong>
                {employee.isActive ? (
                  <MdDone color="green" size={iconsize} />
                ) : (
                  <MdClose color="red" size={iconsize} />
                )}
              </button>
            </Employee>
          );
        })}
    </Container>
  );
};

export default EmployeesList;
