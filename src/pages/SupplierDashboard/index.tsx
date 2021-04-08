import React from 'react';

import { Container, Content } from './styles';

import Header from '../../components/Header';
import KanbanDashboard from '../../components/KabanDashboard';
import TaskDashboard from '../../components/TaskDashboard';
import CardPage from '../../components/CardPage';
import ContactPageDashboard from '../../components/ContactPageComponents/ContactPageDashboard';
import FormDashboard from '../../components/FormComponents/FormDashboard';
import HomeDashboard from '../../components/HomeComponents/HomeDashBoard';
import CompanyContactDashboard from '../../components/CompanyContactComponents/CompanyContactDashboard';
import CustomerServiceOrderDashboard from '../../components/CustomerServiceOrderDashboard';
import { useHomeController } from '../../hooks/homeController';
import { useFunnel } from '../../hooks/funnel';
import MenuButton from '../../components/MenuButton';
import SettingsPage from '../SettingsPage';

const SupplierDashboard: React.FC = () => {
  const { selectedPage } = useHomeController();
  const { selectedFunnel, funnels } = useFunnel();

  return (
    <Container>
      <MenuButton />
      <Header />
      <Content>
        {selectedPage === 'Tasks' && <TaskDashboard />}
        {selectedPage === 'E-Links' && <ContactPageDashboard />}
        {selectedPage === 'Forms' && <FormDashboard />}
        {funnels.length > 0 &&
          selectedFunnel &&
          selectedFunnel.id &&
          selectedPage === 'Comercial' && <KanbanDashboard />}
        {selectedPage === 'Card' && <CardPage />}
        {selectedPage === 'Contacts' && <CompanyContactDashboard />}

        {selectedPage === 'Home' && <HomeDashboard />}
        {selectedPage === 'Settings' && <SettingsPage />}
        {selectedPage === 'ComercialOrders' && (
          <CustomerServiceOrderDashboard />
        )}
      </Content>
    </Container>
  );
};

export default SupplierDashboard;
