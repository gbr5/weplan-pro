import React from 'react';

import { Container, Content } from './styles';

import Header from '../../components/Header';
import TaskDashboard from '../../components/TaskDashboard';
import ContactPageDashboard from '../../components/ContactPageComponents/ContactPageDashboard';
import FormDashboard from '../../components/FormComponents/FormDashboard';
import HomeDashboard from '../../components/HomeComponents/HomeDashBoard';
import CompanyContactDashboard from '../../components/CompanyContactComponents/CompanyContactDashboard';
import CustomerServiceOrderDashboard from '../../components/CustomerServiceOrderDashboard';
import { useHomeController } from '../../hooks/homeController';
import MenuButton from '../../components/MenuButton';

const SupplierDashboard: React.FC = () => {
  const { selectedPage } = useHomeController();

  return (
    <Container>
      <MenuButton />
      <Header />
      <Content>
        {selectedPage === 'Tasks' && <TaskDashboard />}
        {selectedPage === 'E-Links' && <ContactPageDashboard />}
        {selectedPage === 'Forms' && <FormDashboard />}

        {selectedPage === 'Contacts' && <CompanyContactDashboard />}

        {selectedPage === 'Home' && <HomeDashboard />}
        {selectedPage === 'ComercialOrders' && (
          <CustomerServiceOrderDashboard />
        )}
      </Content>
    </Container>
  );
};

export default SupplierDashboard;
