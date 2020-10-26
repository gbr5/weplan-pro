import React from 'react';
import { FiChevronRight } from 'react-icons/fi';
import IEmployeeDTO from '../../dtos/IEmployeeDTO';

import { Container } from './styles';

interface IProps {
  employees: IEmployeeDTO[];
  selectCompany: Function;
}

const SelectCompanyWindow: React.FC<IProps> = ({
  employees,
  selectCompany,
}: IProps) => {
  return (
    <Container>
      {employees.map(employee => {
        const employeeIndex = employees.findIndex(
          tEmployee => tEmployee.id === employee.id + 1,
        );
        return (
          <div key={employee.id}>
            <p>{employeeIndex}</p>
            <h3>{employee.company.name}</h3>
            <button type="button" onClick={selectCompany(employee)}>
              <FiChevronRight size={24} />
            </button>
          </div>
        );
      })}
    </Container>
  );
};

export default SelectCompanyWindow;
