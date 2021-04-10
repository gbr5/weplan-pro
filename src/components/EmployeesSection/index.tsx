import React from 'react';
import EmployeesList from './EmployeesList';

import Header from '../Header';
import MenuButton from '../MenuButton';

import { Container } from './styles';

const EmployeesSection: React.FC = () => {
  return (
    <Container>
      <Header />
      <MenuButton />
      <EmployeesList />
    </Container>
  );
};

export default EmployeesSection;
